CREATE TYPE "public"."status" AS ENUM('todo', 'in-progress', 'done');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" "status" DEFAULT 'todo' NOT NULL,
	"due_date" timestamp,
	"project_id" varchar(24) NOT NULL,
	"assigned_member_id" varchar(24),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
