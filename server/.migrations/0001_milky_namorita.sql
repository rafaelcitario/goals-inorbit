CREATE TABLE IF NOT EXISTS "completed_goals" (
	"completed_goals_id" text PRIMARY KEY NOT NULL,
	"goal_id" text NOT NULL,
	"completed_goals_title" text NOT NULL,
	"completed_goals_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "completed_goals" ADD CONSTRAINT "completed_goals_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
