schema "main" {}

table "checkins" {
  schema = schema.main

  column "id" {
    null = false
    type = uuid
  }
  column "tag" {
    null = false
    type = varchar(32)
  }
  column "activity" {
    null = false
    type = varchar(255)
  }
  column "recordDate" {
    null = false
    type = date
  }
  column "startTime" {
    null = false
    type = datetime
  }
  column "duration" {
    null = false
    type = numeric
  }
  primary_key {
    columns = [column.id]
  }
}
