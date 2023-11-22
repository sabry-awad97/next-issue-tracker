'use client';

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesChart = ({ open, inProgress, closed }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            { name: 'Open', value: open },
            { name: 'In Progress', value: inProgress },
            { name: 'Closed', value: closed },
          ]}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssuesChart;
