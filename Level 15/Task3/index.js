const fs = require("fs");
const path = require("path");

// Define file categories
const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".xls", ".xlsx", ".ppt", ".pptx"],
  videos: [".mp4", ".mkv", ".avi", ".mov", ".wmv"],
  audios: [".mp3", ".wav", ".aac", ".ogg"],
  archives: [".zip", ".rar", ".tar", ".gz"],
  code: [".js", ".html", ".css", ".java", ".py", ".c", ".cpp"],
};

// Function to organize files (Synchronous)
function organizeFilesSync(directory) {
  if (!fs.existsSync(directory)) {
    console.log("Directory not found!");
    return;
  }

  const files = fs.readdirSync(directory);
  let report = [];

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.lstatSync(filePath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      const category = Object.keys(categories).find((key) => categories[key].includes(ext)) || "others";

      const categoryDir = path.join(directory, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir);
      }

      const newFilePath = path.join(categoryDir, file);
      fs.renameSync(filePath, newFilePath);
      report.push(`${file} → ${category}/`);
    }
  });

  console.log("Organized Files (Sync):\n", report.join("\n"));
}

// Function to organize files (Asynchronous)
async function organizeFilesAsync(directory) {
  if (!fs.existsSync(directory)) {
    console.log("Directory not found!");
    return;
  }

  const files = await fs.promises.readdir(directory);
  let report = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.promises.lstat(filePath);
    
    if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const category = Object.keys(categories).find((key) => categories[key].includes(ext)) || "others";

      const categoryDir = path.join(directory, category);
      if (!fs.existsSync(categoryDir)) {
        await fs.promises.mkdir(categoryDir);
      }

      const newFilePath = path.join(categoryDir, file);
      await fs.promises.rename(filePath, newFilePath);
      report.push(`${file} → ${category}/`);
    }
  }

  console.log("Organized Files (Async):\n", report.join("\n"));
}

// Watch Mode: Automatically move new files
function watchDirectory(directory) {
  console.log(`Watching directory: ${directory} for changes...`);
  
  fs.watch(directory, (eventType, filename) => {
    if (filename && eventType === "rename") {
      setTimeout(() => organizeFilesSync(directory), 1000);
    }
  });
}

// Execute script
const directoryPath = path.resolve(process.argv[2] || __dirname);
const mode = process.argv[3]; // "sync" or "async" or "watch"

if (mode === "sync") {
  organizeFilesSync(directoryPath);
} else if (mode === "async") {
  organizeFilesAsync(directoryPath);
} else if (mode === "watch") {
  watchDirectory(directoryPath);
} else {
  console.log("Usage: node fileOrganizer.js <directory_path> <mode(sync/async/watch)>");
}
