import { Grid, Typography, Skeleton, Divider, Stack, LinearProgress, Fade, Box, TextField, InputAdornment } from '@mui/material';
import { ShAvatar } from '../../shStyleExports';
import { ShPaper } from '../../shStyleExports';
import { PrimaryWordpressThemeColor, ShGreen } from '../../shStyleExports';
import { format } from 'date-fns';
import { ShChip } from '../../shStyleExports';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { getInitialsFromName, stringToColor } from '../../utils/avatarText';

export interface IInboxMessage {
  id: number;
  subject: string;
  body: string;
  sender: string;
  received_at: string;
  is_favorite?: boolean;
  is_read?: boolean;
  attachments?: any[] | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Allow additional properties
}

export interface IInboxProps {
  messages: IInboxMessage[];
  loading: boolean;
  selectedMessage: IInboxMessage | null;
  onMessageSelect: (message: IInboxMessage) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  title?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  searchInputAriaLabel?: string;
  renderMessagePreview?: (message: IInboxMessage) => React.ReactNode;
  renderMessageContent?: (message: IInboxMessage) => React.ReactNode;
  getSenderName?: (message: IInboxMessage) => string;
  isMessageNew?: (message: IInboxMessage) => boolean;
}

export const Inbox: React.FC<IInboxProps> = ({
  messages,
  loading,
  selectedMessage,
  onMessageSelect,
  onSearchChange,
  searchQuery,
  title = 'Inbox',
  emptyMessage = 'No messages found.',
  searchPlaceholder,
  searchInputAriaLabel,
  renderMessagePreview,
  renderMessageContent,
  getSenderName = message => message.sender,
  isMessageNew = message => {
    const messageDate = new Date(message.received_at);
    const now = new Date();
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  },
}) => {
  const stripHtml = (html: string) => {
    if (!html) return '';

    // First remove all HTML tags and entities
    let cleaned = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[a-zA-Z0-9#]+;/g, ' ') // Remove any remaining HTML entities
      .trim();

    // Only allow alphanumeric characters, spaces, and basic punctuation
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s.,!?;:()\-'"]/g, ' ');

    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  };

  const filteredMessages = messages?.filter(message => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    const senderName = getSenderName(message);

    return senderName.toLowerCase().includes(searchLower) || message.subject.toLowerCase().includes(searchLower) || stripHtml(message.body).toLowerCase().includes(searchLower);
  });

  const renderInboxList = () => {
    if (loading) {
      return (
        <>
          <Skeleton variant='rectangular' height={80} />
          <Skeleton variant='rectangular' height={80} />
          <Skeleton variant='rectangular' height={80} />
        </>
      );
    }

    return (
      <Fade in timeout={800}>
        <Box>
          {filteredMessages?.map((message, index) => {
            const isSelected = selectedMessage?.id === message.id;
            const senderName = getSenderName(message);
            const avatarBgColor = stringToColor(senderName);
            const initials = getInitialsFromName(senderName, true, true);
            const isNew = isMessageNew(message);

            return (
              <Box
                key={message.id}
                onClick={() => onMessageSelect(message)}
                display='flex'
                alignItems='center'
                padding={2}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isSelected ? grey[50] : 'white',
                  borderBottom: `1px solid ${grey[200]}`,
                  borderLeft: isSelected ? `3px solid ${ShGreen}` : '3px solid transparent',
                  '&:hover': {
                    backgroundColor: grey[50],
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <ShAvatar width={35} height={35} backgroundColor={avatarBgColor} style={{ marginRight: 16 }}>
                  <Typography variant='body1'>{initials}</Typography>
                </ShAvatar>

                <Box flex={1} minWidth={0}>
                  <Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={1}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Typography variant='subtitle2' fontWeight={isSelected ? 600 : 500} color='text.primary' noWrap>
                        {senderName}
                      </Typography>
                      {isNew && <ShChip hideBoxShadow label='New' size='small' customSize='xs' bgColor='#E8EAF6' textColor='#1976d2' />}
                    </Stack>
                    <Typography variant='caption' color='text.secondary'>
                      {format(new Date(message.received_at), 'MMM d')}
                    </Typography>
                  </Stack>

                  <Typography variant='body2' fontWeight={isSelected ? 600 : 400} color='text.primary' noWrap style={{ marginBottom: 4 }}>
                    {message.subject}
                  </Typography>

                  {renderMessagePreview ? (
                    renderMessagePreview(message)
                  ) : (
                    <Typography variant='body2' color='text.secondary' noWrap style={{ fontSize: '0.875rem', lineHeight: 1.2 }}>
                      {stripHtml(message.body).length > 60 ? `${stripHtml(message.body).substring(0, 60)}...` : stripHtml(message.body)}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Fade>
    );
  };

  return (
    <>
      {loading && <LinearProgress />}
      {messages && messages?.length === 0 ? (
        <ShPaper variant='outlined'>
          <Typography variant='body2' gutterBottom>
            {emptyMessage}
          </Typography>
        </ShPaper>
      ) : (
        <Fade in timeout={800}>
          <Grid container style={{ height: '100vh', border: `2px solid ${grey[200]}`, borderRadius: 4 }}>
            <Grid item xs={12} md={4} style={{ borderRight: `2px solid ${grey[200]}`, height: '100%' }}>
              <Box display='flex' flexDirection='column' height='100%'>
                <Box padding={2} borderBottom={`1px solid ${grey[200]}`}>
                  <Typography variant='h6' fontWeight={600} color='text.primary' style={{ marginBottom: 16 }}>
                    {title}
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    size='small'
                    variant='outlined'
                    inputProps={searchInputAriaLabel ? { 'aria-label': searchInputAriaLabel } : undefined}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon color='action' fontSize='small' />
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      borderRadius: 8,
                      backgroundColor: grey[50],
                    }}
                  />
                </Box>
                <Box flex={1} overflow='auto'>
                  {renderInboxList()}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} style={{ height: '100%' }}>
              <Box display='flex' flexDirection='column' height='100%'>
                {selectedMessage ? (
                  <>
                    <Box padding={2} borderBottom={`1px solid ${grey[200]}`}>
                      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                        <Typography variant='h6' fontWeight={600} color='text.primary'>
                          {selectedMessage.subject}
                        </Typography>
                        <ShChip label={format(new Date(selectedMessage.received_at), 'PPPpp')} size='small' customSize='xs' bgColor={PrimaryWordpressThemeColor} textColor='white' />
                      </Stack>
                    </Box>

                    <Box flex={1} overflow='auto' padding={2}>
                      {renderMessageContent ? (
                        renderMessageContent(selectedMessage)
                      ) : (
                        <Stack spacing={2}>
                          <Stack direction='row' alignItems='center' spacing={2}>
                            <ShAvatar width={40} height={40} backgroundColor={stringToColor(selectedMessage.sender)}>
                              {getInitialsFromName(selectedMessage.sender, true, true)}
                            </ShAvatar>
                            <Box>
                              <Typography variant='subtitle1' fontWeight={500} color='text.primary'>
                                {selectedMessage.sender}
                              </Typography>
                              <Typography variant='body2' color='text.secondary'>
                                {format(new Date(selectedMessage.received_at), "PPP 'at' p")}
                              </Typography>
                            </Box>
                          </Stack>

                          <Divider />

                          <Box
                            style={{
                              lineHeight: 1.6,
                            }}
                            dangerouslySetInnerHTML={{ __html: selectedMessage.body }}
                          />
                        </Stack>
                      )}
                    </Box>
                  </>
                ) : (
                  <Box display='flex' alignItems='center' justifyContent='center' height='100%' color='text.secondary'>
                    <Typography variant='body1'>Select a message to view</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Fade>
      )}
    </>
  );
};
