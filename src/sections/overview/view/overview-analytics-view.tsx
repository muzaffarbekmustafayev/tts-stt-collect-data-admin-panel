import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Users"
            total={1352831}
            color="secondary"
            icon={<img alt="Users" src="/assets/icons/glass/ic-glass-users.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Sentences"
            total={714000}
            icon={<img alt="Sentences" src="/assets/icons/navbar/ic-sentence.svg" />}
          />
        </Grid>

        

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Audio"
            total={1723315}
            color="warning"
            icon={<img alt="Audio" src="/assets/icons/navbar/ic-audio.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Checked audios"
            total={234}
            color="error"
            icon={<img alt="Checked audios" src="/assets/icons/navbar/ic-checked.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Current statistics"
            chart={{
              series: [
                { label: 'Sentences', value: 2500 },
                { label: 'Audios', value: 1500 },
                { label: 'Checked audios', value: 500 },
              ],
            }}
          />
        </Grid>
       

        {/* <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
        {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline title="Last activity" list={_timeline} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
