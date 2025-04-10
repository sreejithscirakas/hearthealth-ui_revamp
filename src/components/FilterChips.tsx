import { Stack, Chip, Typography, useMediaQuery, Theme } from '@mui/material';

interface FilterChipsProps {
  vertical?: boolean;
  showLabel?: boolean;
}

export default function FilterChips({ vertical = false, showLabel = true }: FilterChipsProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <>
      {showLabel && !isMobile && <Typography sx={{ mb: vertical ? 2 : 0 }}>Filter by:</Typography>}
      <Stack 
        spacing={1} 
        sx={{ 
          alignItems: vertical ? 'stretch' : 'center',
          width: vertical ? '100%' : 'auto'
        }}
      >
        <Stack 
          direction={vertical ? "column" : "row"} 
          spacing={1}
          sx={{ width: '100%' }}
        >
          <Chip 
            label="Pending Patient Confirmation" 
            color="info" 
            variant="outlined" 
            onClick={handleClick}
            sx={{ justifyContent: vertical ? 'flex-start' : 'center' }}
          />
          <Chip 
            label="Pending" 
            color="warning" 
            variant="outlined" 
            onClick={handleClick}
            sx={{ justifyContent: vertical ? 'flex-start' : 'center' }}
          />
          <Chip 
            label="Confirmed" 
            color="success" 
            variant="outlined" 
            onClick={handleClick}
            sx={{ justifyContent: vertical ? 'flex-start' : 'center' }}
          />
          <Chip 
            label="Cancelled" 
            color="error" 
            variant="outlined" 
            onClick={handleClick}
            sx={{ justifyContent: vertical ? 'flex-start' : 'center' }}
          />
        </Stack>
      </Stack>
    </>
  );
}