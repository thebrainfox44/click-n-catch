# 🎯 Click & Catch!

A fun game where you have to be quick enough to catch the moving smiley

## 📖 Description

Click & Catch is an interactive web game created using Javascript, where players must click on a moving smiley to earn points. The game offers a progression system with XP, a shop and a multiplayer scoreboard.

## 🎮 How to play

1. **Launch** : Submit your name and click on "Start the game"
2. **Goals** : Click on the smiley as fast as you can before time runs out!
3. **Points** : Each clic earns you points and XP
4. **Progression** : Climb the levels to unlock new items
5. **Boutique** : Use your XP to get upgrades
6. **Leaderboard** : Climb the wold leaderboard to show off your skills!

## ✨ Features

### 🎯 Gameplay
- **30 seconds** timer per game
- **score system** in realtime
- **random movment** of the target
- **responsive Interface** (mobile and desktop)

### 📈 Progression
- **XP earnig** for each click
- **XP sytem** with levels
- **XP progession bar** visual feedback
- **Progressive unlocking** of the content

### 🛍️ Interactive Store
- **🎯 Targets**: Various emojis and target designs
- **🌈 Backgrounds**: Custom backgrounds
- **✨ Animations**: Visual effects for clicks
- **🎇 Particles**: Particle systems
- **⚡ Bonuses**: Gameplay improvements
- **🎨 Themes**: Packs combining multiple items

### 🏆 Social Features
- **Online ranking** of high scores
- **Real-time updates** of the leaderboard
- **Personalized nickname system**

## 🔧 Technical Structure

### Main Files
- `index.html` - Main Game Structure
- `style.css` - CSS Styles and Animations
- `script.js` - JavaScript Game Logic
- `icon.jpg` - Game Icon and Favicon

### Technologies Used
- **HTML5** - Semantic Structure
- **CSS3** - Styles and Animations
- **JavaScript ES6+** - Game Logic
- **Google Analytics** - Performance Tracking
- **JSON-LD** - Structured Metadata

### Technical Features
- **Responsive Design** - Mobile and Desktop Friendly
- **LocalStorage** - Player Data Backup
- **Interactive Modals** - Smooth User Interface
- **Toast System** - In-Game Notifications
- **SEO Optimized** - Complete Metadata

## 🚀 Installation and Deployment

### Local Installation
```bash
# Clone the project
git clone https://github.com/thebrainfox44/click-n-catch
cd click-and-catch

# launch the backend
node main

access it on the specified port
```

### Deployment
The game is designed to be hosted on a nodejs sever.

### Configuration
- Modify Google Analytics keys in `<head>`
- Adjust advertising settings if necessary
- Customize canonical and Open Graph URLs

## 📱 Compatibility

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Devices
- **Desktop**: Widescreen with sidebar layout
- **Mobile**: Touch-optimized interface
- **Tablet**: Automatically adapts

## 🎨 Personalization

### Editing Shop Items
Items are defined in script.js with the following structure:
```javascript
{
id: 'item_id',
name: 'Item Name',
cost: 100,
emoji: '😀',
description: 'Description'
}
```
### Adding New Themes
Themes combine several elements:
```javascript
{
id: 'theme_id',
name: 'Theme Name',
cost: 500,
target: 'target_id',
background: 'background_id',
// ...
}
```

## 📊 Analytics and Metrics

The game integrates Google Analytics to track:
- Game sessions
- Average play time
- In-store purchases
- Player progress

## 🔐 Data and Privacy

- **Local Storage**: Data saved in the browser
- **No personal data** collected
- **GDPR compliance** with cookie management
- **Pseudonyms** for ranking only

## 🐛 Troubleshooting

### Common Issues
- **Score not saved**: Check that localStorage is enabled
- **Empty leaderboard**: Network connection issue
- **Slow performance**: Disable animations in settings

### Debug
Open the developer console (F12) to view error logs.

## 🤝 Contribution

Contributions are welcome!
1. Fork the project
2. Create a feature branch
3. Commit the changes
4. Push and create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

Developed by **thebrainfox**
- Website: [click-n-catch.thebrainfox.com](https://click-n-catch.thebrainfox.com)

## 🎯 Roadmap

### Planned Features
- [ ] Real-time multiplayer mode
- [ ] Weekly tournaments
- [ ] Achievement system
- [ ] Progressive difficulty mode
- [ ] Detailed statistics
- [ ] Social media sharing

---

**Have fun and may the best clicker win! 🏆**
