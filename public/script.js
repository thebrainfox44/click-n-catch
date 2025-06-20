class Game {
    constructor() {
        this.playerName = "";
        this.score = 0;
        this.timeLeft = 30;
        this.baseSpeed = 1500; // ms
        this.speed = this.baseSpeed;
        this.gameRunning = false;
        this.gameInterval = null;
        this.timerInterval = null;
        this.nextIsInstant = false;

        this.xp = 0;
        this.level = 1;
        this.baseXPNeeded = 50;
        this.xpLevelMultiplier = 1.65;

        this.selectedTarget = "default";
        this.selectedBackground = "defaultBg";
        this.selectedAnimation = "defaultAnim";
        this.selectedParticle = "defaultParticle";
        this.selectedParticleEmoji = "✨";

        this.ownedItems = [];
        this.selectedTheme = null;

        this.baseFunnyFaceSizeRem = 4;
        this.edgePadding = 20; // px
        this.isMobile = window.innerWidth <= 768;

        this.elements = {};
        this.initElements();
        this.initShopItemsData();
        this.ensureDefaultItemsOwned();
        this.initEventListeners();
        this.loadPlayerData();

        this.showNameModal();
        this.checkAndShowInstructions();

        this.loadLeaderboard();
        this.createToastContainer();

        if (this.elements.funnyFace) {
            this.elements.funnyFace.style.visibility = "hidden";
        }
        this.updateAdBannerHeightVar();
        setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    }

    initElements() {
        this.elements = {
            nameModal: document.getElementById("nameModal"),
            instructionsModal: document.getElementById("instructionsModal"),
            closeInstructionsBtn: document.getElementById(
                "closeInstructionsBtn"
            ),
            dontShowInstructionsAgain: document.getElementById(
                "dontShowInstructionsAgain"
            ),
            gotItBtn: document.getElementById("gotItBtn"),

            shopModal: document.getElementById("shopModal"),
            playerNameInput: document.getElementById("playerNameInput"),
            confirmNameBtn: document.getElementById("confirmNameBtn"),
            closeShop: document.getElementById("closeShop"),
            shopBtn: document.getElementById("shopBtn"),

            playerName: document.getElementById("playerName"),
            currentXP: document.getElementById("currentXP"),
            nextLevelXP: document.getElementById("nextLevelXP"),
            playerLevel: document.getElementById("playerLevel"),
            xpFill: document.getElementById("xpFill"),
            scoreboard: document.getElementById("scoreboard"),
            timer: document.getElementById("timer"),
            message: document.getElementById("message"),
            startBtn: document.getElementById("startBtn"),
            gameArea: document.getElementById("gameArea"),
            funnyFace: document.getElementById("funnyFace"),
            gameHeader: document.querySelector(".game-header"),
            gameInfo: document.querySelector(".game-info"),

            leaderboardSection: document.querySelector(".leaderboard-section"),
            leaderboard: document.getElementById("leaderboard"),
            refreshLeaderboard: document.getElementById("refreshLeaderboard"),

            tabBtns: document.querySelectorAll(".tab-btn"),
            targetItems: document.getElementById("targetItems"),
            backgroundItems: document.getElementById("backgroundItems"),
            animationItems: document.getElementById("animationItems"),
            particleItems: document.getElementById("particleItems"),
            bonusItems: document.getElementById("bonusItems"),
            themeItems: document.getElementById("themeItems"),

            adSlotTopDesktop: document.getElementById("adSlotTopDesktop"),
            adSlotTopMobile: document.getElementById("adSlotTopMobile"),
            adSlotHeaderDesktop: document.getElementById("adSlotHeaderDesktop"),
            adSlotAboveGameMobile: document.getElementById(
                "adSlotAboveGameMobile"
            ),
            adSlotSidebarDesktop: document.getElementById(
                "adSlotSidebarDesktop"
            ),
            adSlotBottomDesktop: document.getElementById("adSlotBottomDesktop"),
            adSlotBottomMobile: document.getElementById("adSlotBottomMobile"),
            sidebarSection: document.querySelector(".sidebar-section"),
        };
    }

    initEventListeners() {
        if (this.elements.confirmNameBtn) {
            this.elements.confirmNameBtn.addEventListener("click", () =>
                this.setPlayerName()
            );
        }
        if (this.elements.playerNameInput) {
            this.elements.playerNameInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") this.setPlayerName();
            });
        }

        let popup = 0;

        if (this.elements.startBtn) {
            this.elements.startBtn.addEventListener("click", () => {
                if (Math.random() > 0.35 && popup > 1) {
                    popup = 0;
                    window.open(
                        "https://seventhdisdainunlucky.com/s798paect?key=a3938d2af0ad44964868475b1bcd2c15",
                        "_blank"
                    );
                }
                popup++;
                this.startGame();
            });
        }
        if (this.elements.funnyFace) {
            this.elements.funnyFace.addEventListener("click", (event) =>
                this.clickTarget(event)
            );
        }

        if (this.elements.gameArea) {
            this.elements.gameArea.addEventListener("click", (event) => {
                if (
                    this.gameRunning &&
                    event.target !== this.elements.funnyFace
                ) {
                    this.createParticles(3, event.clientX, event.clientY, "💧");
                }
            });
        }

        if (this.elements.shopBtn) {
            this.elements.shopBtn.addEventListener("click", () => {
                if (Math.random() > 0.35 && popup > 1) {
                    popup = 0;
                    window.open(
                        "https://seventhdisdainunlucky.com/s798paect?key=a3938d2af0ad44964868475b1bcd2c15",
                        "_blank"
                    );
                }
                popup++;
                this.openShop();
            });
        }
        if (this.elements.closeShop) {
            this.elements.closeShop.addEventListener("click", () => {
                if (Math.random() > 0.35 && popup > 1) {
                    popup = 0;
                    window.open(
                        "https://seventhdisdainunlucky.com/s798paect?key=a3938d2af0ad44964868475b1bcd2c15",
                        "_blank"
                    );
                }
                popup++;
                this.closeShop();
            });
        }

        if (this.elements.tabBtns) {
            this.elements.tabBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (Math.random() > 0.35 && popup > 1) {
                        popup = 0;
                        window.open(
                            "https://seventhdisdainunlucky.com/s798paect?key=a3938d2af0ad44964868475b1bcd2c15",
                            "_blank"
                        );
                    }
                    popup++;
                    this.switchTab(btn.dataset.tab);
                });
            });
        }

        if (this.elements.refreshLeaderboard) {
            this.elements.refreshLeaderboard.addEventListener("click", () => {
                if (Math.random() > 0.35 && popup > 1) {
                    popup = 0;
                    window.open(
                        "https://seventhdisdainunlucky.com/s798paect?key=a3938d2af0ad44964868475b1bcd2c15",
                        "_blank"
                    );
                }
                popup++;
                this.getLeaderboard();
            });
        }

        if (this.elements.closeInstructionsBtn) {
            this.elements.closeInstructionsBtn.addEventListener("click", () =>
                this.hideInstructions()
            );
        }
        if (this.elements.gotItBtn) {
            this.elements.gotItBtn.addEventListener("click", () => {
                localStorage.setItem("consentGranted", "true");

                // Google Analytics consent update function
                function gtag() {
                    dataLayer.push(arguments);
                }

                // Grant all analytics permissions
                gtag("consent", "update", {
                    ad_user_data: "granted",
                    ad_personalization: "granted",
                    ad_storage: "granted",
                    analytics_storage: "granted",
                });
                this.hideInstructions();
            });
        }
        if (this.elements.dontShowInstructionsAgain) {
            this.elements.dontShowInstructionsAgain.addEventListener(
                "change",
                (e) => {
                    localStorage.setItem(
                        "hideGameInstructions",
                        e.target.checked.toString()
                    );
                }
            );
        }

        window.addEventListener("click", (e) => {
            if (
                this.elements.nameModal &&
                e.target === this.elements.nameModal &&
                this.elements.nameModal.style.display === "flex"
            ) {
                if (this.playerName)
                    this.elements.nameModal.style.display = "none"; // Only close if name is already set or being set
            }
            if (
                this.elements.shopModal &&
                e.target === this.elements.shopModal &&
                this.elements.shopModal.style.display === "flex"
            ) {
                this.closeShop();
            }
            if (
                this.elements.instructionsModal &&
                e.target === this.elements.instructionsModal &&
                this.elements.instructionsModal.style.display === "flex"
            ) {
                this.hideInstructions(false); // Don't save preference if closed by clicking outside
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                if (
                    this.elements.nameModal &&
                    this.elements.nameModal.style.display === "flex"
                ) {
                    if (
                        this.playerName ||
                        this.elements.playerNameInput.value.trim() === ""
                    ) {
                        // Allow Esc if input is empty or name already set
                        this.elements.nameModal.style.display = "none";
                    }
                } else if (
                    this.elements.shopModal &&
                    this.elements.shopModal.style.display === "flex"
                ) {
                    this.closeShop();
                } else if (
                    this.elements.instructionsModal &&
                    this.elements.instructionsModal.style.display === "flex"
                ) {
                    this.hideInstructions(false); // Don't save "don't show again" on Esc
                }
            }
        });

        window.addEventListener("resize", () => {
            this.updateAdBannerHeightVar();
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== this.isMobile) {
                this.isMobile = newIsMobile;
            }
            this.applySelectedItems();
        });
    }

    updateAdBannerHeightVar() {
        const adTopBanner = document.querySelector(".ad-banner-top");
        if (adTopBanner) {
            const height = adTopBanner.offsetHeight;
            document.documentElement.style.setProperty(
                "--ad-top-banner-height",
                `${height}px`
            );
        } else {
            document.documentElement.style.setProperty(
                "--ad-top-banner-height",
                `0px`
            );
        }
    }

    checkAndShowInstructions() {
        const hideInstructions =
            localStorage.getItem("hideGameInstructions") === "true";
        if (!hideInstructions && this.elements.instructionsModal) {
            this.elements.instructionsModal.style.display = "flex";
            if (this.elements.dontShowInstructionsAgain) {
                this.elements.dontShowInstructionsAgain.checked = false; // Default to unchecked when shown
            }
        }
    }

    hideInstructions(savePreferenceOnClick = true) {
        if (this.elements.instructionsModal) {
            this.elements.instructionsModal.style.display = "none";
            if (
                savePreferenceOnClick &&
                this.elements.dontShowInstructionsAgain &&
                this.elements.dontShowInstructionsAgain.checked
            ) {
                localStorage.setItem("hideGameInstructions", "true");
            }
        }
    }

    ensureDefaultItemsOwned() {
        const defaultIds = [];
        if (this.shopItems && typeof this.shopItems === "object") {
            Object.values(this.shopItems).forEach((categoryItems) => {
                if (Array.isArray(categoryItems)) {
                    categoryItems.forEach((item) => {
                        if (
                            item &&
                            typeof item === "object" &&
                            item.cost === 0 &&
                            item.id &&
                            !defaultIds.includes(item.id)
                        ) {
                            defaultIds.push(item.id);
                        }
                    });
                }
            });
        }
        this.ownedItems = [...new Set([...this.ownedItems, ...defaultIds])];
    }

    savePlayerData() {
        this.ensureDefaultItemsOwned();
        const data = {
            playerName: this.playerName,
            xp: this.xp,
            level: this.level,
            selectedTarget: this.selectedTarget,
            selectedBackground: this.selectedBackground,
            selectedAnimation: this.selectedAnimation,
            selectedParticle: this.selectedParticle,
            selectedTheme: this.selectedTheme,
            ownedItems: [...new Set(this.ownedItems.filter((id) => id))],
        };
        localStorage.setItem("gamePlayerData_v6", JSON.stringify(data));
    }

    loadPlayerData() {
        // Initialize with game defaults first
        this.selectedTarget = "default";
        this.selectedBackground = "defaultBg";
        this.selectedAnimation = "defaultAnim";
        this.selectedParticle = "defaultParticle";
        this.selectedTheme = null;
        this.ownedItems = [];

        const saved = localStorage.getItem("gamePlayerData_v6");
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.playerName = data.playerName || "";
                this.xp = data.xp || 0;
                this.level = data.level || 1;

                // Validate loaded selections against available shop items
                if (
                    data.selectedTarget &&
                    this.shopItems.targets.find(
                        (i) => i.id === data.selectedTarget
                    )
                )
                    this.selectedTarget = data.selectedTarget;
                if (
                    data.selectedBackground &&
                    this.shopItems.backgrounds.find(
                        (i) => i.id === data.selectedBackground
                    )
                )
                    this.selectedBackground = data.selectedBackground;
                if (
                    data.selectedAnimation &&
                    this.shopItems.animations.find(
                        (i) => i.id === data.selectedAnimation
                    )
                )
                    this.selectedAnimation = data.selectedAnimation;
                if (
                    data.selectedParticle &&
                    this.shopItems.particles.find(
                        (i) => i.id === data.selectedParticle
                    )
                )
                    this.selectedParticle = data.selectedParticle;
                if (
                    data.selectedTheme &&
                    this.shopItems.themes.find(
                        (i) => i.id === data.selectedTheme
                    )
                )
                    this.selectedTheme = data.selectedTheme;

                if (Array.isArray(data.ownedItems)) {
                    this.ownedItems = [
                        ...new Set(data.ownedItems.filter((id) => id)),
                    ]; // Filter out null/undefined IDs
                }
            } catch (e) {
                console.error("Error parsing player data:", e);
                // Potentially reset to defaults if parsing fails catastrophically
                localStorage.removeItem("gamePlayerData_v6");
            }
        }
        this.ensureDefaultItemsOwned(); // Ensure default items are always owned
        this.updatePlayerDisplay();
        this.applySelectedItems();
    }

    setPlayerName() {
        const name = this.elements.playerNameInput.value.trim();
        if (name && name.length > 0 && name.length <= 20) {
            this.playerName = name;
            if (this.elements.nameModal)
                this.elements.nameModal.style.display = "none";
            this.updatePlayerDisplay();
            this.savePlayerData();
            // Only show instructions if they haven't been explicitly dismissed and name modal is closed
            if (
                localStorage.getItem("hideGameInstructions") !== "true" &&
                this.elements.instructionsModal &&
                this.elements.instructionsModal.style.display !== "flex"
            ) {
                this.checkAndShowInstructions();
            }
        } else {
            this.showToast("Nom invalide (1-20 caractères).", "error");
        }
    }

    showNameModal() {
        if (!this.playerName && this.elements.nameModal) {
            this.elements.nameModal.style.display = "flex";
            if (this.elements.playerNameInput)
                this.elements.playerNameInput.focus();
        }
    }

    updatePlayerDisplay() {
        if (this.elements.playerName)
            this.elements.playerName.textContent =
                this.playerName || "Joueur Anonyme";
        if (this.elements.currentXP)
            this.elements.currentXP.textContent = this.xp;
        if (this.elements.playerLevel)
            this.elements.playerLevel.textContent = this.level;

        const xpForNextLevel = this.getXPNeededForLevel(this.level + 1);
        const xpAtCurrentLevelStart = this.getXPNeededForLevel(this.level);

        const progressWithinLevel = this.xp - xpAtCurrentLevelStart;
        const totalXPForThisSegment = xpForNextLevel - xpAtCurrentLevelStart;

        if (this.elements.nextLevelXP)
            this.elements.nextLevelXP.textContent = xpForNextLevel;
        const percentage =
            totalXPForThisSegment > 0
                ? Math.min(
                      (progressWithinLevel / totalXPForThisSegment) * 100,
                      100
                  )
                : this.xp >= xpForNextLevel
                ? 100
                : 0;
        if (this.elements.xpFill)
            this.elements.xpFill.style.width = percentage + "%";
    }

    getXPNeededForLevel(level) {
        if (level <= 1) return 0;
        return Math.floor(
            this.baseXPNeeded * Math.pow(this.xpLevelMultiplier, level - 2)
        );
    }

    addXP(amount) {
        let finalAmount = amount;
        if (this.ownedItems.includes("permXpBoost5"))
            finalAmount = Math.floor(finalAmount * 1.05);
        if (this.ownedItems.includes("permXpBoost10"))
            finalAmount = Math.floor(finalAmount * 1.1);
        if (this.ownedItems.includes("permXpBoost20"))
            finalAmount = Math.floor(finalAmount * 1.2);

        this.xp += finalAmount;

        let xpNeededForNextLevel = this.getXPNeededForLevel(this.level + 1);
        let previousXpNeeded = -1;
        while (
            this.xp >= xpNeededForNextLevel &&
            xpNeededForNextLevel > previousXpNeeded
        ) {
            previousXpNeeded = xpNeededForNextLevel;
            this.level++;
            this.showToast(`🎉 Niveau ${this.level} atteint !`, "success");
            this.createParticles(
                15,
                window.innerWidth / 2,
                window.innerHeight / 3,
                "🎉"
            );
            xpNeededForNextLevel = this.getXPNeededForLevel(this.level + 1);
            if (this.level > 200) break; // Safety break for extreme leveling
        }

        this.updatePlayerDisplay();
        this.savePlayerData();
        return finalAmount; // Return the actual XP added after boosts
    }

    startGame() {
        if (!this.playerName) {
            this.showNameModal();
            this.showToast("Veuillez d'abord entrer votre nom.", "error");
            return;
        }
        this.score = 0;
        this.timeLeft = 30;
        if (this.ownedItems.includes("permTimePlus5")) this.timeLeft += 5;
        if (this.ownedItems.includes("permTimePlus10")) this.timeLeft += 10;
        // Add min score bonus
        if (this.ownedItems.includes("permMinScore10")) this.score += 10;

        let currentBaseSpeed = this.baseSpeed;
        if (this.ownedItems.includes("permSlowStart5"))
            currentBaseSpeed *= 1.05; // Slower means higher value
        if (this.ownedItems.includes("permSlowStart10"))
            currentBaseSpeed *= 1.1;

        this.speed = currentBaseSpeed - this.level * 15;
        if (this.isMobile) {
            this.speed *= 1.25;
        } // Slower on mobile
        this.speed = Math.max(this.isMobile ? 500 : 350, this.speed); // Min speed cap

        this.gameRunning = true;
        if (this.elements.startBtn) this.elements.startBtn.disabled = true;
        if (this.elements.message)
            this.elements.message.textContent = "C'est parti !";
        if (this.elements.funnyFace)
            this.elements.funnyFace.style.visibility = "visible";

        this.updateScore();
        this.updateTimer();
        this.moveTarget(true); // Instant first move

        if (this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => this.moveTarget(), this.speed);

        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (
                this.ownedItems.includes("permTimeFreeze5") &&
                Math.random() < 0.05
            ) {
                this.timeLeft++; // Freeze time for this second
                this.showToast("⏱️ Temps gelé (1s)!", "info");
            }
            this.updateTimer();
            if (this.timeLeft <= 0) this.endGame();
        }, 1000);
        this.applySelectedItems(); // Re-apply in case target size changed
    }

    endGame() {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        clearInterval(this.timerInterval);
        this.timerInterval = null;

        if (this.elements.funnyFace)
            this.elements.funnyFace.style.visibility = "hidden";
        if (this.elements.startBtn) this.elements.startBtn.disabled = false;

        const xpGainedBase =
            Math.floor(this.score * 2.5) +
            (this.ownedItems.includes("permScoreToXpFlat")
                ? this.score * 1
                : 0);
        const actualXPGained = this.addXP(xpGainedBase); // addXP handles its own boosts

        this.showMessage(
            `⏰ Partie terminée! Score: ${this.score} (+${actualXPGained} XP)`,
            "info"
        );
        this.saveScoreToLeaderboard();
    }

    clickTarget(event) {
        if (!this.gameRunning) return;

        let scorePerClick = 1;
        if (this.ownedItems.includes("permScorePerClick1")) scorePerClick += 1;
        this.score += scorePerClick;

        this.updateScore();
        this.increaseDifficulty();
        this.moveTarget(); // Instant move on click
        this.applyClickAnimation();
        if (event) {
            let particleCount = 5;
            // permParticleBurst is handled in createParticles
            this.createParticles(particleCount, event.clientX, event.clientY);
        }

        if (
            this.ownedItems.includes("permLuckyClick5") &&
            Math.random() < 0.05
        ) {
            const bonusXP = 25 + this.level * 2; // Scaled bonus XP
            this.addXP(bonusXP);
            this.showToast(`🍀 Chance! +${bonusXP} XP bonus!`, "success");
        }
    }

    moveTarget(instant = false) {
        if (this.nextIsInstant) {
            instant = true;
            this.nextIsInstant = false;
        }
        if (instant) this.nextIsInstant = true;
        if (!this.elements.funnyFace || !this.elements.gameArea) return;

        if (!this.gameRunning && !instant) {
            // If game not running and not an instant move (e.g. setup)
            if (this.elements.funnyFace.style.visibility !== "hidden") {
                // Move it off-screen instead of just hiding to ensure it's not accidentally clickable
                this.elements.funnyFace.style.transform =
                    "translate(-9999px, -9999px)";
            }
            return;
        }

        const face = this.elements.funnyFace;
        const area = this.elements.gameArea;

        const faceRect = face.getBoundingClientRect();
        const actualFaceWidth = faceRect.width;
        const actualFaceHeight = faceRect.height;

        const minX = this.edgePadding;
        const minY = this.edgePadding;
        const maxX = area.clientWidth - actualFaceWidth - this.edgePadding;
        const maxY = area.clientHeight - actualFaceHeight - this.edgePadding;

        if (maxX < minX || maxY < minY) {
            // Game area too small for face + padding
            // Center the face if area is too small
            face.style.transform = `translate(${Math.max(
                0,
                area.clientWidth / 2 - actualFaceWidth / 2
            )}px, ${Math.max(
                0,
                area.clientHeight / 2 - actualFaceHeight / 2
            )}px)`;
            if (face.style.visibility === "hidden" && this.gameRunning)
                face.style.visibility = "visible";
            return;
        }

        const x = Math.max(
            minX,
            Math.min(Math.floor(Math.random() * (maxX - minX + 1)) + minX, maxX)
        );
        const y = Math.max(
            minY,
            Math.min(Math.floor(Math.random() * (maxY - minY + 1)) + minY, maxY)
        );

        const newTransform = `translate(${x}px, ${y}px)`;

        if (instant) {
            face.style.transition = "none"; // Disable transition for instant move
            face.style.visibility = "hidden"; // Hide, move, then show to prevent seeing the jump
            face.style.transform = newTransform;
            requestAnimationFrame(() => {
                // Ensure transform is applied before making visible
                if (this.gameRunning || face.style.visibility === "hidden") {
                    // Only make visible if game is running or it was explicitly hidden for the move
                    face.style.visibility = "visible";
                }
                requestAnimationFrame(() => {
                    // Restore transition after the move
                    face.style.transition = "";
                });
            });
        } else {
            face.style.transform = newTransform;
            if (face.style.visibility === "hidden" && this.gameRunning)
                face.style.visibility = "visible";
        }
    }

    increaseDifficulty() {
        let speedReduction = 30; // ms
        if (this.ownedItems.includes("permSlowSpeedDecrease"))
            speedReduction = 20;

        const minSpeed = this.isMobile ? 500 : 350;
        if (this.speed > minSpeed) {
            this.speed -= speedReduction;
            this.speed = Math.max(minSpeed, this.speed); // Ensure it doesn't go below minSpeed
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(
                () => this.moveTarget(),
                this.speed
            );
        }
    }

    updateScore() {
        if (this.elements.scoreboard)
            this.elements.scoreboard.textContent = `Score : ${this.score}`;
    }
    updateTimer() {
        if (this.elements.timer)
            this.elements.timer.textContent = `Temps restant : ${this.timeLeft}s`;
    }
    showMessage(text, type = "info") {
        if (this.elements.message) {
            this.elements.message.textContent = text;
            this.elements.message.className = `message ${type}`;
        }
    }

    createToastContainer() {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            document.body.appendChild(container);
        }
    }
    showToast(message, type = "info", duration = 3000) {
        const toastContainer = document.getElementById("toastContainer");
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Force reflow to ensure transition is applied
        toast.offsetHeight;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            toast.addEventListener("transitionend", () => toast.remove(), {
                once: true,
            });
        }, duration);
    }

    applyClickAnimation() {
        const face = this.elements.funnyFace;
        if (!face || !this.shopItems || !this.shopItems.animations) return;

        const animationItem = this.shopItems.animations.find(
            (a) => a.id === this.selectedAnimation
        );
        const animClass =
            animationItem && animationItem.clickClass
                ? animationItem.clickClass
                : "click-bounce"; // Default animation

        // Remove any existing animation classes to prevent conflicts
        const allClasses = this.shopItems.animations
            .map((a) => a.clickClass)
            .filter(Boolean);
        face.classList.remove(...allClasses);

        // Add the new animation class
        face.classList.add(animClass);

        // Remove the class after animation ends (assuming 600ms is max animation duration)
        setTimeout(() => {
            face.classList.remove(animClass);
        }, 600);
    }

    createParticles(count, clickX, clickY, overrideEmoji = null) {
        const emojiToUse = overrideEmoji || this.selectedParticleEmoji || "✨";
        let finalCount = count;
        if (!overrideEmoji && this.ownedItems.includes("permParticleBurst")) {
            finalCount = Math.max(1, Math.floor(count * 1.5));
        }

        for (let i = 0; i < finalCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.textContent = emojiToUse;
            // Adjust for scroll position to place particles correctly on viewport
            particle.style.left =
                clickX - 12 + Math.random() * 24 - window.scrollX + "px";
            particle.style.top =
                clickY - 12 + Math.random() * 24 - window.scrollY + "px";

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000); // Particle lifetime
        }
    }

    applySelectedItems() {
        if (!this.shopItems || !this.elements.funnyFace) return;

        // If a theme is selected, it dictates the individual items
        if (this.selectedTheme) {
            const theme = this.shopItems.themes.find(
                (th) => th.id === this.selectedTheme
            );
            if (theme) {
                this.selectedTarget = theme.targetId || "default";
                this.selectedBackground = theme.backgroundId || "defaultBg";
                this.selectedAnimation = theme.animationId || "defaultAnim";
                this.selectedParticle = theme.particleId || "defaultParticle";
            }
        }

        // Apply Target Emoji
        const targetItem = this.shopItems.targets.find(
            (t) => t.id === this.selectedTarget
        );
        this.elements.funnyFace.textContent = targetItem
            ? targetItem.emoji
            : "😜";

        // Apply Background
        const bgItem = this.shopItems.backgrounds.find(
            (b) => b.id === this.selectedBackground
        );
        if (bgItem) {
            document.body.className = bgItem.class || "bg-gradient1"; // Default class if none specified
            const darkClasses = [
                "bg-space",
                "bg-forest",
                "bg-city",
                "bg-nightsky",
                "bg-volcano",
                "bg-matrix",
                "bg-tech",
                "bg-clouds",
            ];
            const isDark = darkClasses.includes(bgItem.class) || bgItem.dark; // Check explicit dark flag too

            document.body.style.color = isDark ? "#f0f0f0" : "#333";
            if (this.elements.gameHeader)
                this.elements.gameHeader.style.background = isDark
                    ? "rgba(40,40,50,0.8)"
                    : "rgba(255,255,255,0.9)";
            if (this.elements.leaderboardSection)
                this.elements.leaderboardSection.style.background = isDark
                    ? "rgba(40,40,50,0.8)"
                    : "rgba(255,255,255,0.9)";
            if (this.elements.gameInfo)
                this.elements.gameInfo.style.color = isDark
                    ? "#f0f0f0"
                    : "#333";
        } else {
            // Fallback to default if bgItem not found
            document.body.className = "bg-gradient1";
            document.body.style.color = "#333";
            if (this.elements.gameHeader)
                this.elements.gameHeader.style.background =
                    "rgba(255,255,255,0.9)";
            if (this.elements.leaderboardSection)
                this.elements.leaderboardSection.style.background =
                    "rgba(255,255,255,0.9)";
            if (this.elements.gameInfo)
                this.elements.gameInfo.style.color = "#333";
        }

        // Apply Particle Emoji for clicks
        const particleItem = this.shopItems.particles.find(
            (p) => p.id === this.selectedParticle
        );
        this.selectedParticleEmoji = particleItem ? particleItem.emoji : "✨";

        // Apply Target Size Bonuses
        let scaleFactor = 1;
        if (this.ownedItems.includes("permTargetSize10")) scaleFactor *= 1.1;
        if (this.ownedItems.includes("permTargetSize20")) scaleFactor *= 1.2; // Note: these should be cumulative if intended, or use highest
        if (this.ownedItems.includes("permTargetSize30")) scaleFactor *= 1.3; // For cumulative: scaleFactor = 1 * 1.1 * 1.2 * 1.3. For highest: check which is owned.
        // Current implementation: if all 3 owned, it's 1 * 1.1 * 1.2 * 1.3. This is a BIG increase.
        // Assuming they are meant to be exclusive or only highest applies is safer, but sticking to current code.

        // Adjust base size for mobile more finely
        let baseRemSize = this.baseFunnyFaceSizeRem;
        if (this.isMobile) {
            if (window.innerWidth <= 480) {
                // Small mobile
                baseRemSize = 2.5;
            } else {
                // Regular mobile
                baseRemSize = 3;
            }
        }
        this.elements.funnyFace.style.fontSize = `${
            baseRemSize * scaleFactor
        }rem`;

        this.updateThemeSelectionVisuals(); // Update shop visuals for themes
    }

    updateThemeSelectionVisuals() {
        document
            .querySelectorAll(".shop-item.theme-selected")
            .forEach((el) => el.classList.remove("theme-selected"));
        if (this.selectedTheme) {
            const themeItemEl = document.querySelector(
                `.shop-item[data-item-id="${this.selectedTheme}"]`
            );
            if (themeItemEl) {
                themeItemEl.classList.add("theme-selected");
            }
        }
    }

    handleShopItemClick(item, type) {
        const isOwned = this.ownedItems.includes(item.id);

        if (!isOwned) {
            if (this.xp >= item.cost) {
                this.xp -= item.cost;
                this.ownedItems.push(item.id);
                this.updatePlayerDisplay();
                this.showToast(`✅ ${item.name} acheté !`, "success");
                // Auto-equip if not a bonus item, or if it's a theme
                if (type === "theme") {
                    this.selectedTheme = item.id;
                } else if (type !== "bonus") {
                    // targets, backgrounds, animations, particles
                    this.setSelectedItem(type, item.id);
                    this.selectedTheme = null; // Selecting individual item deselects theme
                }
                // Bonuses are passive, no "selection" needed beyond purchase
            } else {
                this.showToast(
                    `❌ XP insuffisant (${item.cost} requis)`,
                    "error"
                );
                return;
            }
        }

        // If already owned, or just bought and not a bonus item
        if (
            isOwned ||
            (type !== "bonus" && !isOwned && this.xp + item.cost >= item.cost)
        ) {
            // Check if just bought
            if (type === "theme") {
                this.selectedTheme = item.id;
            } else if (type !== "bonus") {
                this.setSelectedItem(type, item.id);
                this.selectedTheme = null; // Selecting individual item deselects theme
            }
        }

        this.applySelectedItems(); // Apply changes to game
        this.renderShopItems(); // Re-render shop to show new owned/selected states
        this.savePlayerData(); // Save all changes
    }

    getSelectedItem(type) {
        switch (type) {
            case "target":
                return this.selectedTarget;
            case "background":
                return this.selectedBackground;
            case "animation":
                return this.selectedAnimation;
            case "particle":
                return this.selectedParticle;
            default:
                return null;
        }
    }

    setSelectedItem(type, id) {
        switch (type) {
            case "target":
                this.selectedTarget = id;
                break;
            case "background":
                this.selectedBackground = id;
                break;
            case "animation":
                this.selectedAnimation = id;
                break;
            case "particle":
                this.selectedParticle = id;
                break;
        }
    }

    renderShopItems() {
        const renderGrid = (items, containerElement, type) => {
            if (!containerElement) {
                console.warn(`Shop container for ${type} not found.`);
                return;
            }
            containerElement.innerHTML = ""; // Clear previous items
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    if (item.hiddenInShop) return; // Skip items marked as hidden
                    const itemEl = this.createShopItem(item, type);
                    containerElement.appendChild(itemEl);
                });
            } else {
                console.warn(`No items to render for type: ${type}`);
            }
        };

        if (!this.shopItems) {
            console.error("Shop items not initialized!");
            return;
        }

        renderGrid(this.shopItems.targets, this.elements.targetItems, "target");
        renderGrid(
            this.shopItems.backgrounds,
            this.elements.backgroundItems,
            "background"
        );
        renderGrid(
            this.shopItems.animations,
            this.elements.animationItems,
            "animation"
        );
        renderGrid(
            this.shopItems.particles,
            this.elements.particleItems,
            "particle"
        );
        renderGrid(this.shopItems.bonuses, this.elements.bonusItems, "bonus");
        renderGrid(this.shopItems.themes, this.elements.themeItems, "theme");

        this.updateThemeSelectionVisuals(); // Ensure theme selection visuals are correct after render
    }

    createShopItem(item, type) {
        const div = document.createElement("div");
        div.className = "shop-item";
        div.dataset.itemId = item.id;

        const isOwned = this.ownedItems.includes(item.id);
        let isSelected = false;

        if (type === "theme") {
            isSelected = this.selectedTheme === item.id;
        } else if (type !== "bonus") {
            // For target, background, animation, particle
            isSelected = this.getSelectedItem(type) === item.id;
            // If a theme is active, check if this item is part of the theme
            if (this.selectedTheme) {
                const activeTheme = this.shopItems.themes.find(
                    (th) => th.id === this.selectedTheme
                );
                if (activeTheme) {
                    if (
                        (type === "target" &&
                            item.id === activeTheme.targetId) ||
                        (type === "background" &&
                            item.id === activeTheme.backgroundId) ||
                        (type === "animation" &&
                            item.id === activeTheme.animationId) ||
                        (type === "particle" &&
                            item.id === activeTheme.particleId)
                    ) {
                        // This item is part of the active theme, so it's "selected" via the theme
                        isSelected = true;
                    } else if (this.getSelectedItem(type) === item.id) {
                        // This item was individually selected, but a theme is now active that doesn't include it
                        // So, it's not "selected" in the context of the active theme, unless it's the theme's item itself
                        // Handled by the above check. This 'else if' might be redundant if logic is purely based on current selections.
                        // The goal is: if a theme is selected, only its components are "selected".
                        // If no theme, then individual selections apply.
                        // Let's simplify: if a theme is selected, isSelected is true ONLY if item is part of theme.
                        // If no theme, isSelected is true if item is individually selected.
                        if (
                            this.getSelectedItem(type) === item.id &&
                            !(
                                (type === "target" &&
                                    item.id === activeTheme.targetId) ||
                                (type === "background" &&
                                    item.id === activeTheme.backgroundId) ||
                                (type === "animation" &&
                                    item.id === activeTheme.animationId) ||
                                (type === "particle" &&
                                    item.id === activeTheme.particleId)
                            )
                        ) {
                            isSelected = false; // Overridden by theme
                        }
                    }
                }
            }
        }

        if (isOwned) div.classList.add("owned");
        if (isSelected) {
            if (type === "theme") div.classList.add("theme-selected");
            // Specific class for selected theme
            else div.classList.add("selected");
        }

        let previewHTML = "";
        if (type === "target" || type === "particle") {
            previewHTML = `<div class="item-preview">${
                item.emoji || item.preview || "?"
            }</div>`;
        } else if (type === "animation") {
            const animationItemDefinition = this.shopItems.animations.find(
                (a) => a.id === item.id
            );
            const animPreviewClass = animationItemDefinition
                ? animationItemDefinition.animPreviewClass
                : "defaultAnim";
            previewHTML = `<div class="item-preview anim-preview anim-preview-${animPreviewClass}">${
                item.preview || "?"
            }</div>`;
        } else if (type === "background") {
            previewHTML = `<div class="item-preview ${
                item.class || "bg-gradient1"
            }" style="width: 40px; height: 25px; border-radius: 5px; margin: 0 auto 8px auto; border: 1px solid #ccc;"></div>`;
        } else if (type === "bonus") {
            let bonusEmoji = "⚡"; // Default bonus emoji
            if (item.id.includes("Xp")) bonusEmoji = "📈";
            else if (item.id.includes("TargetSize")) bonusEmoji = "🔎";
            else if (item.id.includes("Time")) bonusEmoji = "⏱️";
            else if (item.id.includes("Score")) bonusEmoji = "🎯";
            else if (item.id.includes("Lucky")) bonusEmoji = "🍀";
            else if (item.id.includes("Particle")) bonusEmoji = "🎇";
            previewHTML = `<div class="item-preview">${bonusEmoji}</div>`;
        } else if (type === "theme") {
            const targetEmoji =
                this.shopItems.targets.find((t) => t.id === item.targetId)
                    ?.emoji || "❔";
            const bgClass =
                this.shopItems.backgrounds.find(
                    (b) => b.id === item.backgroundId
                )?.class || "bg-gradient1";
            const animPreview =
                this.shopItems.animations.find((a) => a.id === item.animationId)
                    ?.preview || "❔";
            const particleEmoji =
                this.shopItems.particles.find((p) => p.id === item.particleId)
                    ?.emoji || "✨";
            previewHTML = `
                <div class="item-preview theme-preview">
                    <span style="font-size: 1.2rem;">${targetEmoji}</span>
                    <div style="width: 20px; height: 12px; border-radius: 3px; margin: 1px auto;" class="${bgClass}"></div>
                    <span style="font-size: 0.9rem;">${animPreview}</span>
                    <span style_display_block="font-size: 0.9rem;">${particleEmoji}</span>
                </div>`;
        }

        let statusText = isSelected
            ? "ÉQUIPÉ"
            : isOwned
            ? type === "bonus"
                ? "ACQUIS"
                : "POSSÉDÉ"
            : `${item.cost} XP`;

        div.innerHTML = `
            ${previewHTML}
            <div class="item-name">${item.name}</div>
            ${
                item.description
                    ? `<div class="item-description">${item.description}</div>`
                    : ""
            }
            <div class="item-cost">${statusText}</div>
        `;

        // Enable click unless it's a bonus item that's already owned, or a non-bonus item that's selected
        if (type === "bonus" && isOwned) {
            div.style.cursor = "default";
        } else if (isSelected && type !== "theme") {
            // If already selected (and not a theme, themes can be re-clicked to ensure selection)
            div.style.cursor = "default";
        } else {
            div.addEventListener("click", () =>
                this.handleShopItemClick(item, type)
            );
        }

        return div;
    }

    openShop() {
        if (this.elements.shopModal)
            this.elements.shopModal.style.display = "flex";
        this.renderShopItems();
    }
    closeShop() {
        if (this.elements.shopModal)
            this.elements.shopModal.style.display = "none";
    }

    switchTab(tabName) {
        if (this.elements.tabBtns) {
            this.elements.tabBtns.forEach((btn) =>
                btn.classList.remove("active")
            );
        }
        document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
        });

        const activeBtn = document.querySelector(
            `.tab-btn[data-tab="${tabName}"]`
        );
        const activeContent = document.getElementById(`${tabName}Tab`);

        if (activeBtn) activeBtn.classList.add("active");
        if (activeContent) activeContent.classList.add("active");
    }

    async saveScoreToLeaderboard() {
        if (!this.playerName || this.playerName.trim() === "") {
            this.showToast(
                "Nom de joueur requis pour sauvegarder le score.",
                "error"
            );
            return;
        }
        if (
            this.score <= 0 &&
            !this.ownedItems.includes("permSubmitZeroScore")
        ) {
            this.showToast(
                "Score de 0 non sauvegardé (achetez le bonus pour l'autoriser).",
                "info"
            );
            return;
        }

        if (this.elements.leaderboard)
            this.elements.leaderboard.innerHTML =
                '<div class="loading">Sauvegarde...</div>';
        try {
            const response = await fetch("/api/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    playerName: this.playerName,
                    score: this.score,
                    xp: this.xp,
                }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                let errorDetails = result.error || response.statusText;
                if (result.details && Array.isArray(result.details)) {
                    errorDetails = result.details.join(", ");
                } else if (
                    result.details &&
                    typeof result.details === "string"
                ) {
                    errorDetails = result.details;
                } else if (result.message) {
                    errorDetails = result.message;
                }
                throw new Error(errorDetails);
            }
            this.showToast("Score sauvegardé !", "success");
            this.loadLeaderboard(); // Refresh leaderboard after saving
        } catch (error) {
            console.error("Erreur sauvegarde score:", error);
            this.showToast(`Erreur sauvegarde: ${error.message}`, "error");
            if (this.elements.leaderboard)
                this.elements.leaderboard.innerHTML =
                    '<div class="loading">Erreur sauvegarde.</div>';
        }
    }

    async loadLeaderboard() {
        if (!this.elements.leaderboard) return;
        this.elements.leaderboard.innerHTML =
            '<div class="loading">Chargement...</div>';
        try {
            const response = await fetch("/api/scores?limit=15"); // Fetch top 15 scores
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    error: "Erreur inconnue lors du chargement du classement",
                }));
                throw new Error(errorData.error || response.statusText);
            }

            const result = await response.json();
            if (!result.success || !Array.isArray(result.data)) {
                // Ensure data is an array
                throw new Error(
                    result.message ||
                        "Format de réponse du classement incorrect"
                );
            }

            const scores = result.data;
            if (scores.length === 0) {
                this.elements.leaderboard.innerHTML =
                    '<div class="loading">Aucun score. Soyez le premier !</div>';
                return;
            }

            this.elements.leaderboard.innerHTML = ""; // Clear previous scores
            scores.forEach((scoreEntry, index) => {
                const scoreEl = document.createElement("div");
                scoreEl.className = "score-item";
                const date = scoreEntry.date
                    ? new Date(scoreEntry.date).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                      })
                    : "N/A";
                const medal =
                    index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`;
                scoreEl.innerHTML = `
                    <div class="score-rank">${medal}</div>
                    <div class="score-info">
                        <div class="score-name">${scoreEntry.playerName}</div>
                        <div class="score-date">${date}</div>
                    </div>
                    <div class="score-value">${scoreEntry.score} pts</div>`;
                this.elements.leaderboard.appendChild(scoreEl);
            });
        } catch (error) {
            console.error("Erreur chargement leaderboard:", error);
            this.elements.leaderboard.innerHTML = `<div class="loading">Erreur chargement. (${error.message})</div>`;
            this.showToast("Erreur chargement classement.", "error");
        }
    }
}

// Initialize Shop Items Data (as a method of Game.prototype or static property)
Game.prototype.initShopItemsData = function () {
    this.shopItems = {
        targets: [
            { id: "default", name: "Classique", emoji: "😜", cost: 0 },
            { id: "cool", name: "Cool", emoji: "😎", cost: 50 },
            { id: "love", name: "Amoureux", emoji: "😍", cost: 100 },
            { id: "party", name: "Fête", emoji: "🥳", cost: 150 },
            { id: "robot", name: "Robot", emoji: "🤖", cost: 200 },
            { id: "alien", name: "Alien", emoji: "👽", cost: 300 },
            { id: "ghost", name: "Fantôme", emoji: "👻", cost: 250 },
            { id: "poop", name: "Crotte", emoji: "💩", cost: 50 },
            { id: "cat", name: "Chat", emoji: "😺", cost: 400 },
            { id: "dog", name: "Chien", emoji: "🐶", cost: 400 },
            { id: "unicorn", name: "Licorne", emoji: "🦄", cost: 600 },
            { id: "pizza", name: "Pizza", emoji: "🍕", cost: 350 },
            { id: "burger", name: "Burger", emoji: "🍔", cost: 350 },
            { id: "star", name: "Étoile", emoji: "⭐", cost: 220 },
            { id: "devil", name: "Diablotin", emoji: "😈", cost: 450 },
            { id: "angel", name: "Ange", emoji: "😇", cost: 450 },
            { id: "money", name: "Argent", emoji: "🤑", cost: 700 },
            { id: "brain", name: "Cerveau", emoji: "🧠", cost: 550 },
            { id: "king", name: "Roi", emoji: "👑", cost: 800 },
            { id: "diamond", name: "Diamant", emoji: "💎", cost: 1000 },
            { id: "controller", name: "Manette", emoji: "🎮", cost: 400 },
            { id: "clown", name: "Clown", emoji: "🤡", cost: 280 },
            { id: "fireTarget", name: "Feu", emoji: "🔥", cost: 320 },
            { id: "iceTarget", name: "Glace", emoji: "🧊", cost: 320 },
            { id: "skull", name: "Crâne", emoji: "💀", cost: 500 },
            { id: "pumpkin", name: "Citrouille", emoji: "🎃", cost: 380 },
            { id: "gift", name: "Cadeau", emoji: "🎁", cost: 420 },
            { id: "bomb", name: "Bombe", emoji: "💣", cost: 300 },
            { id: "gem", name: "Gemme", emoji: "💠", cost: 650 },
            { id: "moon", name: "Lune", emoji: "🌙", cost: 520 },
            { id: "sun", name: "Soleil", emoji: "☀️", cost: 520 },
            { id: "targetIcon", name: "Cible Rouge", emoji: "🎯", cost: 150 },
        ],
        backgrounds: [
            {
                id: "defaultBg",
                name: "Rose Défaut",
                class: "bg-gradient1",
                cost: 0,
                dark: false,
            },
            {
                id: "oceanBg",
                name: "Océan",
                class: "bg-gradient2",
                cost: 75,
                dark: false,
            },
            {
                id: "sunsetBg",
                name: "Coucher Soleil",
                class: "bg-gradient3",
                cost: 125,
                dark: false,
            },
            {
                id: "fireBg",
                name: "Feu Follet",
                class: "bg-gradient4",
                cost: 175,
                dark: false,
            },
            {
                id: "natureBg",
                name: "Nature Vive",
                class: "bg-gradient5",
                cost: 225,
                dark: false,
            },
            {
                id: "spaceBg",
                name: "Espace Profond",
                class: "bg-space",
                cost: 500,
                dark: true,
            },
            {
                id: "forestBg",
                name: "Forêt Mystique",
                class: "bg-forest",
                cost: 450,
                dark: true,
            },
            {
                id: "cityBg",
                name: "Urbain",
                class: "bg-city",
                cost: 400,
                dark: true,
            },
            {
                id: "sunnyBg",
                name: "Ensoleillé",
                class: "bg-sunny",
                cost: 300,
                dark: false,
            },
            {
                id: "nightSkyBg",
                name: "Ciel Étoilé",
                class: "bg-nightsky",
                cost: 550,
                dark: true,
            },
            {
                id: "volcanoBg",
                name: "Volcanique",
                class: "bg-volcano",
                cost: 700,
                dark: true,
            },
            {
                id: "matrixBg",
                name: "Matriciel",
                class: "bg-matrix",
                cost: 800,
                dark: true,
            },
            {
                id: "candyBg",
                name: "Bonbons",
                class: "bg-candy",
                cost: 450,
                dark: false,
            },
            {
                id: "cloudsBg",
                name: "Nuageux",
                class: "bg-clouds",
                cost: 380,
                dark: true,
            },
            {
                id: "techBg",
                name: "Technologique",
                class: "bg-tech",
                cost: 650,
                dark: true,
            },
            {
                id: "retroBg",
                name: "Rétro Vague",
                class: "bg-retro",
                cost: 580,
                dark: false,
            },
        ],
        animations: [
            {
                id: "defaultAnim",
                name: "Rebond",
                preview: "↕️",
                clickClass: "click-bounce",
                animPreviewClass: "defaultAnim",
                cost: 0,
            },
            {
                id: "pulseAnim",
                name: "Pulsation",
                preview: "💓",
                clickClass: "click-pulse",
                animPreviewClass: "pulseAnim",
                cost: 60,
            },
            {
                id: "spinAnim",
                name: "Rotation",
                preview: "🌀",
                clickClass: "click-spin",
                animPreviewClass: "spinAnim",
                cost: 120,
            },
            {
                id: "shakeAnim",
                name: "Secousse",
                preview: "📳",
                clickClass: "click-shake",
                animPreviewClass: "shakeAnim",
                cost: 180,
            },
            {
                id: "jiggleAnim",
                name: "Gigote",
                preview: "〰️",
                clickClass: "click-jiggle",
                animPreviewClass: "jiggleAnim",
                cost: 250,
            },
            {
                id: "shrinkAnim",
                name: "Réduit/Grandit",
                preview: "➿",
                clickClass: "click-shrink",
                animPreviewClass: "shrinkAnim",
                cost: 300,
            },
            {
                id: "teleportAnim",
                name: "Téléportation",
                preview: "💨",
                clickClass: "click-teleport",
                animPreviewClass: "teleportAnim",
                cost: 400,
            },
            {
                id: "flashAnim",
                name: "Flash",
                preview: "⚡",
                clickClass: "click-flash",
                animPreviewClass: "flashAnim",
                cost: 350,
            },
            {
                id: "explodeAnim",
                name: "Explosion",
                preview: "💥",
                clickClass: "click-explode",
                animPreviewClass: "explodeAnim",
                cost: 500,
            },
        ],
        particles: [
            {
                id: "defaultParticle",
                name: "Étoiles",
                emoji: "✨",
                cost: 0,
                description: "Classique scintillant.",
            },
            {
                id: "bubblesParticle",
                name: "Bulles",
                emoji: "🫧",
                cost: 100,
                description: "Des bulles légères.",
            },
            {
                id: "heartsParticle",
                name: "Cœurs",
                emoji: "💖",
                cost: 150,
                description: "Plein d'amour.",
            },
            {
                id: "moneyParticle",
                name: "Argent",
                emoji: "💰",
                cost: 250,
                description: "Faites pleuvoir l'argent!",
            },
            {
                id: "fireParticle",
                name: "Flammes",
                emoji: "🔥",
                cost: 200,
                description: "Effet enflammé.",
            },
            {
                id: "snowParticle",
                name: "Neige",
                emoji: "❄️",
                cost: 180,
                description: "Rafale hivernale.",
            },
            {
                id: "notesParticle",
                name: "Musique",
                emoji: "🎶",
                cost: 220,
                description: "Notes musicales.",
            },
            {
                id: "magicParticle",
                name: "Magie",
                emoji: "🪄",
                cost: 300,
                description: "Une touche de magie.",
            },
        ],
        bonuses: [
            {
                id: "permXpBoost5",
                name: "XP +5%",
                description: "Gain d'XP +5%",
                cost: 500,
            },
            {
                id: "permTargetSize10",
                name: "Cible +10%",
                description: "Taille cible +10%",
                cost: 300,
            },
            {
                id: "permXpBoost10",
                name: "XP +10%",
                description: "Gain d'XP +10%",
                cost: 1200,
            },
            {
                id: "permTargetSize20",
                name: "Cible +20%",
                description: "Taille cible +20%",
                cost: 750,
            },
            {
                id: "permTimePlus5",
                name: "Temps +5s",
                description: "Durée partie +5s",
                cost: 1000,
            },
            {
                id: "permScorePerClick1",
                name: "Score +1/clic",
                description: "Point bonus par clic",
                cost: 800,
            },
            {
                id: "permLuckyClick5",
                name: "Chance XP 5%",
                description: "5% chance XP bonus/clic",
                cost: 1500,
            },
            {
                id: "permSlowStart5",
                name: "Début Lent +5%",
                description: "Vitesse initiale -5%",
                cost: 600,
            },
            {
                id: "permScoreToXpFlat",
                name: "Score -> XP",
                description: "+1 XP par point score",
                cost: 2000,
            },
            {
                id: "permSlowSpeedDecrease",
                name: "Accélération Lente",
                description: "Difficulté monte moins vite",
                cost: 1300,
            },
            {
                id: "permXpBoost20",
                name: "XP +20%",
                description: "Gain d'XP +20%",
                cost: 2500,
            },
            {
                id: "permTimePlus10",
                name: "Temps +10s",
                description: "Durée partie +10s",
                cost: 2200,
            },
            {
                id: "permMinScore10",
                name: "Score Min +10",
                description: "Score de départ +10 pts",
                cost: 400,
            },
            {
                id: "permParticleBurst",
                name: "Explosion Particules",
                description: "Plus de particules/clic",
                cost: 350,
            },
            {
                id: "permSubmitZeroScore",
                name: "Sauver Score Nul",
                description: "Permet de sauver score de 0",
                cost: 100,
            },
            {
                id: "permTargetSize30",
                name: "Cible +30%",
                description: "Taille cible +30%",
                cost: 1500,
            },
            {
                id: "permTimeFreeze5",
                name: "Geler Temps 5%",
                description: "5% chance geler temps 1s / clic",
                cost: 2800,
            },
        ],
        themes: [
            {
                id: "themeSpooky",
                name: "Effrayant",
                targetId: "ghost",
                backgroundId: "nightSkyBg",
                animationId: "teleportAnim",
                particleId: "skullParticle",
                cost: 1000,
                description: "Ambiance Halloween !",
            },
            {
                id: "themeSpace",
                name: "Cosmique",
                targetId: "alien",
                backgroundId: "spaceBg",
                animationId: "spinAnim",
                particleId: "starParticle",
                cost: 1200,
                description: "Voyage intersidéral.",
            },
            {
                id: "themeParty",
                name: "Festif",
                targetId: "party",
                backgroundId: "sunnyBg",
                animationId: "jiggleAnim",
                particleId: "notesParticle",
                cost: 900,
                description: "C'est la fête !",
            },
            {
                id: "themeRich",
                name: "Fortuné",
                targetId: "diamond",
                backgroundId: "cityBg",
                animationId: "pulseAnim",
                particleId: "moneyParticle",
                cost: 2000,
                description: "Brillez de mille feux.",
            },
            {
                id: "themeTech",
                name: "Cyberpunk",
                targetId: "robot",
                backgroundId: "matrixBg",
                animationId: "flashAnim",
                particleId: "magicParticle",
                cost: 1800,
                description: "Le futur, c'est maintenant.",
            },
            {
                id: "themeLove",
                name: "Romantique",
                targetId: "love",
                backgroundId: "oceanBg",
                animationId: "pulseAnim",
                particleId: "heartsParticle",
                cost: 750,
                description: "Pour les cœurs tendres.",
            },
        ],
    };
    // Helper to ensure theme-specific particles exist in the particles list (even if hidden)
    const ensureThemeParticleExists = (id, emoji, name) => {
        if (!this.shopItems.particles.find((p) => p.id === id)) {
            this.shopItems.particles.push({
                id: id,
                name: `${name} (Thème)`,
                emoji: emoji,
                cost: 99999,
                description: "Exclusif au thème.",
                hiddenInShop: true,
            });
        }
    };
    ensureThemeParticleExists("skullParticle", "💀", "Crânes");
    ensureThemeParticleExists("starParticle", "🌟", "Étoiles Cosmiques");

    // Ensure all backgrounds have a 'dark' property
    if (
        this.shopItems.backgrounds &&
        Array.isArray(this.shopItems.backgrounds)
    ) {
        this.shopItems.backgrounds.forEach((bg) => {
            if (bg.dark === undefined) bg.dark = false;
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.attrapeLaTeteRigoloteGame = new Game();
});
