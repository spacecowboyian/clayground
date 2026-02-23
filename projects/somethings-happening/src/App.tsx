import { PlayableTimeline } from '@/components/PlayableTimeline';
import { mockEventData } from '@/lib/mockEventData';

const event = mockEventData['superbowl-lx-2026'];

export function App() {
  return (
    <PlayableTimeline
      title={event.title}
      startDate={event.startDate}
      endDate={event.endDate}
      initialStatus={event.status}
      description={event.description}
      initialItems={event.items}
      pendingLiveItems={event.pendingLiveItems}
    />
  );
}
