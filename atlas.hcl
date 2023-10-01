variable "NODE_ENV" {
  type    = string
  default = env("NODE_ENV") ? env("NODE_ENV") : "production"
}

variable "AUTH_TOKEN" {
  type    = string
  default = env("VITE_TURSO_TOKEN")
}

variable "DB_URL" {
  type    = string
  default = var.NODE_ENV == "production" ? "libsql+wss://time-machine-kvdomingo.turso.io?authToken=${var.AUTH_TOKEN}" : "sqlite://./db.sqlite"
  exclude = ["_litestream*"]
}

env "turso" {
  url = var.DB_URL
}
