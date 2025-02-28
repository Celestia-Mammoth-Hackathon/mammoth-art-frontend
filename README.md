# 🦣 MammothArt: NFT-Powered Generative Art Platform

> Where your existing NFTs shape the art you mint

![MammothArt Platform Preview](/public/videos/MainPage.gif)

## 🌟 Experience MammothArt

### 🔥 Live Demo
Check out our platform in action: [https://mammoth-art.up.railway.app/](https://mammoth-art.up.railway.app/)

### 🧬 NFT-Weighted Rarity System
Your existing MammothArt NFTs influence the probability of minting rare pieces through **Forma blockchain's on-chain metadata**:
- Stack multiple NFTs for higher chances by leveraging their on-chain traits
- Smart contracts read existing NFT metadata directly from Forma blockchain
- Dynamic rarity calculations based on your NFT collection's traits
- Unlock special trait combinations through trait inheritance

### 🎨 For Artists
- Submit generative art collections
- Define trait inheritance rules based on **Forma's on-chain metadata**
- Set rarity tiers and probabilities that interact with existing NFTs
- Create dynamic collections that evolve with the community's NFTs

### 👾 For Collectors
- Use existing NFTs as "trait boosters" through their **on-chain metadata**
- View rarity chances before minting based on your NFT portfolio
- Strategic minting based on trait compatibility
- Transparent rarity system powered by blockchain data

## 💎 Revenue Structure
| Party | Fee | Purpose |
|-------|-----|---------|
| Collectors | 10% | Per mint |

### 📸 Platform Preview

#### 🏠 Home Page
![Home](/public/videos/MainPage.gif)

#### 🎨 Creating Collection Interface
![Create](/public/videos/CreatePage.gif)

#### 👤 Collection View
![Collection](/public/videos/ProfilePage.gif)

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/mammoth-art.git
   cd mammoth-art
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`:
   - `NEXT_PUBLIC_ALCHEMY_API_KEY`: Your Alchemy API key
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect Project ID

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Set up your own generative art collection

### Project Structure
Generative art collections on MammothArt are simply packaged web pages that use data inputs to render visual outputs. Projects should contain the following:

- **index.html** (required): This file displays your tokens
- **hl-gen.js** (required): This file gives you access to data from the blockchain, helps you generate deterministic randomness in your tokens, and provides methods to set metadata and capture preview images
- Any libraries required to render your tokens, like p5.js, three.js, tone.js, etc.
- Any other files required to render your tokens, including images, fonts, video files, etc.
Note that, in general, you should not reference external libraries or files, as these references may break in the future. Any resource your project needs to display properly should be included locally.

For example, a simple project using p5.js might look like this:
```
index.html
sketch.js
lib/
  ↳ p5.min.js
  ↳ hl-gen.js
fonts/
  ↳ IBMPlexMono-Regular.ttf
textures/
  ↳ texture-1.png
  ↳ texture-2.png
```

### Submit your collection
Once you're ready to test or deploy your project on MammothArt:

- Create a .zip of your project files, ensuring that you select the group of files to zip, not the folder itself:
![MammothArt Platform Preview](public/zip.png)
- Your .zip should not be larger than 2GB. All project assets are stored on Arweave by default, a decentralized and permanent storage network.
- Go to [https://mammoth-art.up.railway.app/](https://mammoth-art.up.railway.app/) and connect your wallet.
- Click Create and upload the .zip file of your code-based generative project and continue with testing.

### Example Collections
Download our example collections to get started:
- [Basic Example](/zip/BASIC-P5-EXAMPLE-UPLOAD-ME.zip)
- [Basic Studio Example](/zip/basic-p5-studio-example.zip)
- [Advanced Example](/zip/ADVANCED-P5-EXAMPLE-UPLOAD-ME.zip)

## 🔗 Quick Links
- [P5.js Documentation](https://p5js.org/reference/)
- [Forma Documentation](https://docs.forma.art/)
- [Modularium API](https://modularium-api.sketchpad-1.forma.art/)
- [Platform Overview (coming soon)]()
- [Artist Guidelines (coming soon)]()
- [Collector Guide (coming soon)]()
- [FAQ (coming soon)]()

## 📬 Contact & Support

- Twitter: [@MammothBros](https://twitter.com/MammothBros)


## 🎨 Featured Collections
*Coming soon - showcase of top collections and artists*

## 📊 Platform Statistics
*Coming soon - live platform metrics and analytics*

---

<p align="center">
  Built with ❤️ for the Mammoth Hackathon 2024
</p>