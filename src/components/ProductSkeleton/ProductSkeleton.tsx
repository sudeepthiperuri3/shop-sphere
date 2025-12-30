import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

interface ProductSkeletonProps {
  count?: number;
}

export default function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Card sx={{ height: '100%' }}>
            <Skeleton
              variant="rectangular"
              height={200}
              animation="wave"
              sx={{ backgroundColor: 'grey.100' }}
            />
            <CardContent>
              <Skeleton variant="text" height={28} animation="wave" />
              <Skeleton variant="text" height={28} width="80%" animation="wave" />
              <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                <Skeleton variant="rectangular" width={100} height={20} animation="wave" />
                <Skeleton variant="text" width={40} animation="wave" />
              </Box>
              <Skeleton variant="text" height={32} width="40%" animation="wave" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant="rectangular" width={100} height={36} animation="wave" />
                <Skeleton variant="circular" width={40} height={40} animation="wave" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
