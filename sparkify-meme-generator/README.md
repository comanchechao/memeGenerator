# 🎨 Sparkify Meme Generator

A modern, interactive meme generator built with React, TypeScript, Vite, and Fabric.js. Create custom memes using templates and the beloved Sparky character for your NFT project!

## ✨ Features

- **Interactive Canvas**: Drag, resize, rotate, and edit elements with ease
- **Meme Templates**: Choose from various pre-designed templates
- **Sparky Characters**: Add different Sparky character poses and expressions
- **Text Editing**: Add custom text with various fonts and styling options
- **Real-time Editing**: Live preview of your meme as you create it
- **Export Options**: Download your memes as high-quality images
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Fabric.js** - Powerful canvas library for interactive graphics
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sparkify-meme-generator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📖 Usage

### Creating a Meme

1. **Select a Template**: Choose from the available meme templates in the sidebar
2. **Add Sparky Character**: Pick a Sparky character with different expressions
3. **Add Text**: Click "Add Text" or use text mode to add custom text
4. **Edit Elements**:
   - Click and drag to move elements
   - Use corner handles to resize
   - Rotate using the rotation handle
   - Double-click text to edit content
5. **Export**: Click "Download" to save your meme

### Toolbar Features

- **Select Mode**: Default mode for selecting and moving objects
- **Text Mode**: Click on canvas to add text
- **Zoom Controls**: Zoom in/out and reset view
- **Alignment Tools**: Align selected objects
- **History**: Undo/Redo actions (coming soon)
- **Export**: Download your creation

### Sidebar Features

- **Templates Tab**: Browse and select meme templates by category
- **Characters Tab**: Choose Sparky characters with different expressions
- **Search**: Find specific templates or characters
- **View Modes**: Switch between grid and list view
- **Current Selection**: See what's currently selected

## 🎨 Customization

### Adding New Templates

Add new templates to `src/utils/mockData.ts`:

```typescript
{
  id: 'template-new',
  name: 'New Template',
  imageUrl: 'path/to/template.jpg',
  thumbnail: 'path/to/thumbnail.jpg',
  category: 'custom',
  width: 500,
  height: 500,
}
```

### Adding New Characters

Add new Sparky characters to `src/utils/mockData.ts`:

```typescript
{
  id: 'sparky-new',
  name: 'New Sparky',
  imageUrl: 'path/to/character.png',
  thumbnail: 'path/to/thumbnail.png',
  poses: ['pose1', 'pose2'],
  expressions: ['happy', 'excited'],
}
```

### Styling

The project uses Tailwind CSS with custom color schemes:

- **Primary**: Blue color scheme for main UI elements
- **Sparky**: Golden/yellow color scheme for Sparky-related elements

Customize colors in `tailwind.config.js`.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Canvas.tsx      # Main canvas component
│   ├── Sidebar.tsx     # Template and character selection
│   └── Toolbar.tsx     # Editing tools
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   ├── canvas.ts       # Canvas manipulation functions
│   └── mockData.ts     # Sample data for templates and characters
├── assets/             # Static assets
└── App.tsx             # Main application component
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

1. **Canvas Component**: Handles Fabric.js canvas initialization and interactions
2. **Sidebar Component**: Manages template and character selection
3. **Toolbar Component**: Provides editing tools and controls
4. **App Component**: Main application layout and state management

## 🎯 Roadmap

- [ ] Undo/Redo functionality
- [ ] More text styling options
- [ ] Layer management
- [ ] Save/Load projects
- [ ] More Sparky character variations
- [ ] Animation support
- [ ] Collaborative editing
- [ ] NFT metadata generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fabric.js** - For the powerful canvas library
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool

---

Made with ❤️ for the Sparky NFT community
