package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/bankptrk/react-go/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var collection *mongo.Collection

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MONGODB_URL := os.Getenv("MONGODB_URL")
	if MONGODB_URL == "" {
		log.Fatal("MONGODB_URL environment variable is not set")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOption := options.Client().ApplyURI(MONGODB_URL)
	client, err := mongo.Connect(ctx, clientOption)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB!")

	collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return handlers.GetTodos(c, collection)
	})
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		return handlers.CreateTodo(c, collection)
	})
	app.Put("/api/todos/:id", func(c *fiber.Ctx) error {
		return handlers.UpdateTodo(c, collection)
	})
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		return handlers.DeleteTodo(c, collection)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}
