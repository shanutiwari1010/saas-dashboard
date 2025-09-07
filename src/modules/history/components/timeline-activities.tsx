import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { activities } from "@/modules/history/data/activity";

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

export function TimelineActivities() {
  return (
    <div className="flex h-full flex-col">
      {/* Activities Section */}
      <div className="m-5">
        <h3 className="heading mb-2 py-2">Activities</h3>
        <div className="relative">
          <div className="">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative flex h-14 items-start gap-3"
              >
                {/* Activity content */}
                <div className="min-w-0 flex-1">
                <span className="from-primary/20 via-primary/40 to-primary/20 absolute top-0 bottom-2 left-3 z-10 w-0.5 bg-gradient-to-b "></span>
                  <div>
                    <div className="flex items-start gap-2">
                      <Avatar className="z-20 h-6 w-6">
                        <AvatarImage src={activity.image} />
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <p className="truncate text-sm font-light">
                          {activity.title}
                        </p>
                        <span className="text-muted-foreground text-xs">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div> 
                    </div>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}