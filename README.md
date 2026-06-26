# Gator RSS Blog Aggregator
A command-line interface (CLI) application built with TypeScript, Node.js, and Drizzle ORM that aggregates RSS feeds, tracks user subscriptions, and lets you browse cross-feed posts directly from your terminal.

# Tech Stack
- Runtime: Node.js (TypeScript)
- ORM: Drizzle ORM
- Database: PostgreSQL

# Database Schema
The database relies on 4 relational tables structured with strong data-integrity rules:

- users -> stores users
- feeds -> stores global RSS feed URL listings created by specific users
- feed_follows -> many-to-many join table tracking user-to-feed subscriptions. Includes a strict unique pair constraint (userId + feedId) to prevent duplicate subscriptions
- posts -> stores parsed articles scraped from RSS streams with unique URL safety constraints

> If a user or a feed record is deleted, all matching dependent rows inside feed_follows and posts are deleted automatically.

# Commands
| Command     | Arguments              | Description                                                        |
| :---------- |:-----------------------:| --------------------------------------------------------------------|
| register    | `<username>`            | Registers a new user in DB and sets config currentUserName.        |
| login       | `<username>`            | Sets the config currentUserName.                 |
| users       | None                    | Lists all users.                 |
| feeds       | None                    | Prints every tracked RSS feed along with its creating user metadata. |
| agg         | `<time_between_reqs>`   | Runs the background worker engine to continuously loop and scrape oldest/unfetched feeds. Arg <time_between_reqs> in ms, s, m, h e.g: 1ms|
| reset       | None                    | Clears users table. |
| addfeed     | `<name> <url>`          | Adds a new RSS feed and follows added to logged-in user. |
| follow      | `<url>`                 | Follows an existing feed for the logged-in user.                  |
| following   | None                    | Lists all feeds the logged-in user currently follows.              |
| unfollow    | `<url>`                 | Unfollows a feed for the logged-in user.                           |
| browse      | `[limit]`               | Displays recent posts from feeds the logged-in user follows.       |

> agg runs continuously, looping over the oldest/unfetched feeds until manually stopped with Ctrl+C.

# Configuration

The CLI reads its settings from a config file at **~/.gatorconfig.json**. It stores the Postgres connection string and the currently logged-in user:

```
json{
  "db_url": "postgres://user:pass@localhost:5432/gator?sslmode=disable",
  "current_user_name": "<user>"
}
```
 - **db_url** -> connection string used to reach the Postgres database.
 - **current_user_name** -> the active user set by the login command; updated automatically each time you log in.


# Setup
## Prerequisites
Node.js (v18+) and npm
PostgreSQL running locally (or accessible via the db_url you configure)
## Steps
### 1. Clone the repo and install dependencies:

```
git clone https://github.com/iB0GI/blog-aggregator
cd blog-aggregator
npm install
```

### 2. Create your config file at ~/.gatorconfig.json (see Configuration above) pointing to your Postgres instance.
### 3. Run database migrations to set up the schema:

```
npm run generate
npm run migrate
```

### 4. Run:
```
npm run start -- <command> [args]
```
