const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const process = require("process");
require("dotenv").config();

const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split("=");
    acc[key.replace(/^--/, "")] = value || true;
    return acc;
}, {});

class GameServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || args.port || 4001;
        this.scoresFile = path.join(__dirname, "data", "scores.json");
        this.dataDir = path.join(__dirname, "data");

        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.json({ limit: "10mb" }));

        // Request logging middleware
        // this.app.use((req, res, next) => {
        //     console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        //     next();
        // });

        // Error handling middleware
        this.app.use((err, req, res, next) => {
            console.error("Server error:", err);
            res.status(500).json({
                error: "Internal server error",
                message:
                    process.env.NODE_ENV === "development"
                        ? err.message
                        : "Something went wrong",
            });
        });
    }

    setupRoutes() {
        // API Routes
        this.app.get("/api/scores", this.getScores.bind(this));
        this.app.post("/api/scores", this.addScore.bind(this));

        // Health check endpoint
        this.app.get("/api/health", (req, res) => {
            res.json({ status: "ok", timestamp: new Date().toISOString() });
        });

        // Main route
        this.app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "index.html"));
        });

        // 404 handler
        this.app.use("*", (req, res) => {
            res.status(404).json({ error: "Route not found" });
        });
    }

    async ensureDataDirectory() {
        try {
            await fs.mkdir(this.dataDir, { recursive: true });
            console.log("Data directory ensured");
        } catch (error) {
            console.error("Error creating data directory:", error);
            throw error;
        }
    }

    async readScores() {
        try {
            const data = await fs.readFile(this.scoresFile, "utf8");
            const scores = JSON.parse(data);

            // Validate scores array structure
            if (!Array.isArray(scores)) {
                console.warn(
                    "Scores file contains invalid data, resetting to empty array"
                );
                return [];
            }

            return scores.filter(
                (score) =>
                    score &&
                    typeof score.playerName === "string" &&
                    typeof score.score === "number" &&
                    !isNaN(score.score)
            );
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log(
                    "Scores file not found, starting with empty scores"
                );
                return [];
            }
            console.error("Error reading scores:", error);
            return [];
        }
    }

    async writeScores(scores) {
        try {
            const validScores = scores.filter(
                (score) =>
                    score &&
                    typeof score.playerName === "string" &&
                    typeof score.score === "number" &&
                    !isNaN(score.score)
            );

            await fs.writeFile(
                this.scoresFile,
                JSON.stringify(validScores, null, 2)
            );
        } catch (error) {
            console.error("Error writing scores:", error);
            throw error;
        }
    }

    validateScoreData(data) {
        const errors = [];

        if (!data.playerName) {
            errors.push("Player name is required");
        } else if (typeof data.playerName !== "string") {
            errors.push("Player name must be a string");
        } else if (data.playerName.trim().length === 0) {
            errors.push("Player name cannot be empty");
        } else if (data.playerName.length > 50) {
            errors.push("Player name is too long (max 50 characters)");
        }

        if (data.score === undefined || data.score === null) {
            errors.push("Score is required");
        } else if (typeof data.score !== "number" || isNaN(data.score)) {
            errors.push("Score must be a valid number");
        } else if (data.score < 0) {
            errors.push("Score cannot be negative");
        } else if (data.score > 1000000) {
            errors.push("Score is too high (max 1,000,000)");
        }

        if (
            data.xp !== undefined &&
            (typeof data.xp !== "number" || isNaN(data.xp))
        ) {
            errors.push("XP must be a valid number if provided");
        }

        return errors;
    }

    async getScores(req, res) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 10, 100);
            const scores = await this.readScores();

            const topScores = [...scores]
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
                .map((score) => ({
                    id: score.id,
                    playerName: score.playerName,
                    score: score.score,
                    xp: score.xp || 0,
                    date: score.date,
                }));

            res.json({
                success: true,
                data: topScores,
                total: scores.length,
            });
        } catch (error) {
            console.error("Error getting scores:", error);
            res.status(500).json({
                success: false,
                error: "Failed to retrieve scores",
            });
        }
    }

    async addScore(req, res) {
        try {
            const validationErrors = this.validateScoreData(req.body);
            if (validationErrors.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: validationErrors,
                });
            }

            const { playerName, score, xp = 0 } = req.body;
            const scores = await this.readScores();

            const newScore = {
                id: Date.now() + Math.random(), // More unique ID
                playerName: playerName.trim().substring(0, 50),
                score: Math.round(score),
                xp: Math.round(xp),
                date: new Date().toISOString(),
            };

            scores.push(newScore);

            // Keep only the top 1000 scores to prevent file from growing too large
            if (scores.length > 1000) {
                const sortedScores = [...scores].sort(
                    (a, b) => b.score - a.score
                );
                scores.splice(0, scores.length, ...sortedScores.slice(0, 1000));
            }

            await this.writeScores(scores);

            res.status(201).json({
                success: true,
                data: newScore,
                message: "Score added successfully",
            });
        } catch (error) {
            console.error("Error adding score:", error);
            res.status(500).json({
                success: false,
                error: "Failed to add score",
            });
        }
    }

    async start() {
        try {
            await this.ensureDataDirectory();

            this.app.listen(this.port, () => {
                console.log(`Click-n-Catch running on port ${this.port}`);
            });
        } catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    }

    // Graceful shutdown
    setupGracefulShutdown() {
        const shutdown = (signal) => {
            process.exit(0);
        };

        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));
    }
}

// Start the server
const server = new GameServer();
server.setupGracefulShutdown();
server.start().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});
