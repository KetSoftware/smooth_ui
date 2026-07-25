import { alpha, useTheme } from '@mui/material/styles';
import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ShNavTreeChildren, ShNavTreeItems, ShNavTreeRow, ShNavTreeSvg } from './ShNavTree';

const GUIDE_W = 24;
const STEM_X = 8;
const BRANCH_END = 22;
const CURVE = 14;
const TOP_EXTEND = 10;

type Geo = {
  height: number;
  mids: number[];
};

type Props = {
  children: ReactNode;
  /** When false, skip guide paint (collapsed sections still mount for Collapse). */
  visible?: boolean;
  /** Optional bump after Collapse enter / content toggles to re-run measure (same math). */
  layoutKey?: string | number;
};

/** Flatten Fragments so each row is measured (same children contract as sidenav Links). */
function flattenNavChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => {
    if (child == null || typeof child === 'boolean') return [];
    if (!isValidElement(child)) return [child];
    if (child.type === Fragment) {
      return flattenNavChildren((child.props as { children?: ReactNode }).children);
    }
    return [child];
  });
}

/**
 * One SVG for the whole group, drawn in CSS pixels (viewBox === size).
 * Glass look: soft frosted stroke + thin highlight rim.
 *
 * Copied from smoothhiring_hrms `NavTreeGroup` (stem/branch path).
 * Midpoints use getBoundingClientRect so outline + sidenav stay aligned under
 * nested position:relative / Collapse.
 */
export function ShNavTreeGroup({ children, visible = true, layoutKey = 0 }: Props) {
  const theme = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);

  const items = useMemo(() => flattenNavChildren(children), [children]);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root || !visible) {
      setGeo(null);
      return;
    }
    const height = root.clientHeight;
    if (height <= 0) {
      // Keep prior geo during Collapse enter (height can briefly read 0).
      return;
    }
    const rootRect = root.getBoundingClientRect();
    const mids = rowRefs.current.slice(0, items.length).map(el => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      if (rect.height <= 0) return 0;
      return rect.top - rootRect.top + rect.height / 2;
    });
    // Skip empty midpoints so we do not wipe guides mid-animation.
    if (!mids.length || mids.every(y => y <= 0)) return;
    setGeo({ height, mids });
  }, [items.length, visible]);

  useLayoutEffect(() => {
    rowRefs.current.length = items.length;
    if (!visible) {
      setGeo(null);
      return;
    }
    measure();
    // Remeasure after Collapse enter settles (outline + sidenav).
    const raf1 = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(measure);
    });
    const t = window.setTimeout(measure, 220);
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') {
      return () => {
        cancelAnimationFrame(raf1);
        window.clearTimeout(t);
      };
    }

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measure);
    });
    ro.observe(root);
    rowRefs.current.forEach(el => {
      if (el) ro.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(t);
      ro.disconnect();
    };
    // layoutKey intentionally included so callers can force remmeasure after Collapse.
  }, [measure, items.length, visible, layoutKey]);

  const glass = useMemo(() => {
    const light = theme.palette.mode === 'light';
    return {
      frosted: light ? alpha('#64748b', 0.22) : alpha('#ffffff', 0.2),
      highlight: light ? alpha('#ffffff', 0.4) : alpha('#ffffff', 0.22),
    };
  }, [theme.palette.mode]);

  const pathD = useMemo(() => {
    if (!geo?.mids.length) return '';
    const { mids } = geo;
    const y0 = mids[0] - TOP_EXTEND;
    const lastMid = mids[mids.length - 1];
    const curveStart = Math.max(y0, lastMid - CURVE);

    let d = `M ${STEM_X} ${y0} V ${curveStart}`;
    d += ` Q ${STEM_X} ${lastMid} ${STEM_X + CURVE} ${lastMid}`;
    d += ` H ${BRANCH_END}`;

    for (let i = 0; i < mids.length - 1; i += 1) {
      d += ` M ${STEM_X} ${mids[i]} H ${BRANCH_END}`;
    }
    return d;
  }, [geo]);

  const pathProps = {
    d: pathD,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <ShNavTreeChildren ref={rootRef}>
      {visible && geo && pathD ? (
        <ShNavTreeSvg
          width={GUIDE_W}
          height={geo.height}
          viewBox={`0 0 ${GUIDE_W} ${geo.height}`}
          aria-hidden
        >
          {/* Frosted body */}
          <path {...pathProps} stroke={glass.frosted} strokeWidth={1.35} />
          {/* Soft glass highlight (no blur bloom) */}
          <path {...pathProps} stroke={glass.highlight} strokeWidth={0.65} opacity={0.5} />
        </ShNavTreeSvg>
      ) : null}
      <ShNavTreeItems>
        {items.map((child, index) => (
          <ShNavTreeRow
            key={isValidElement(child) && child.key != null ? String(child.key) : `tree-row-${index}`}
            ref={(el: HTMLDivElement | null) => {
              rowRefs.current[index] = el;
            }}
          >
            {child}
          </ShNavTreeRow>
        ))}
      </ShNavTreeItems>
    </ShNavTreeChildren>
  );
}
