#!/usr/bin/env node

/**
 * Tarot Card Image Optimization Script
 *
 * This script optimizes tarot card images by:
 * 1. Converting JPEG to WebP format (30-50% size reduction)
 * 2. Generating multiple sizes for responsive images
 * 3. Maintaining high quality while reducing file size
 *
 * Output:
 * - public/cards/webp/{name}.webp (800x1340 - detail view)
 * - public/cards/webp/{name}-thumb.webp (400x670 - thumbnails)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/cards');
const OUTPUT_DIR = path.join(__dirname, '../public/cards/webp');

// Image sizes
const SIZES = {
  detail: { width: 800, height: 1340, suffix: '' },     // For detail pages
  thumb: { width: 400, height: 670, suffix: '-thumb' }  // For card lists/thumbnails
};

// WebP quality (80 = excellent quality with good compression)
const WEBP_QUALITY = 80;

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created output directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Get all JPEG files from input directory
 */
function getJpegFiles() {
  return fs.readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .sort();
}

/**
 * Optimize a single image to WebP format with multiple sizes
 */
async function optimizeImage(filename) {
  const inputPath = path.join(INPUT_DIR, filename);
  const baseName = path.parse(filename).name;

  const results = [];

  for (const [sizeName, config] of Object.entries(SIZES)) {
    const outputFilename = `${baseName}${config.suffix}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    try {
      const info = await sharp(inputPath)
        .resize(config.width, config.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = info.size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      results.push({
        size: sizeName,
        filename: outputFilename,
        originalSize,
        newSize,
        reduction
      });

    } catch (error) {
      console.error(`✗ Error processing ${filename} (${sizeName}):`, error.message);
    }
  }

  return results;
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Main optimization process
 */
async function main() {
  console.log('🎴 Tarot Card Image Optimization\n');
  console.log('Configuration:');
  console.log(`  Input:  ${INPUT_DIR}`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Quality: ${WEBP_QUALITY}`);
  console.log(`  Sizes: detail (${SIZES.detail.width}x${SIZES.detail.height}), thumb (${SIZES.thumb.width}x${SIZES.thumb.height})\n`);

  // Ensure output directory exists
  ensureOutputDir();

  // Get all JPEG files
  const jpegFiles = getJpegFiles();
  console.log(`Found ${jpegFiles.length} JPEG files to optimize\n`);

  if (jpegFiles.length === 0) {
    console.log('⚠ No JPEG files found!');
    return;
  }

  // Process all images
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let processedCount = 0;

  for (const filename of jpegFiles) {
    const results = await optimizeImage(filename);

    if (results.length > 0) {
      processedCount++;
      console.log(`[${processedCount}/${jpegFiles.length}] ${filename}`);

      for (const result of results) {
        console.log(`  ${result.size.padEnd(6)} → ${result.filename.padEnd(20)} ${formatBytes(result.newSize).padStart(9)} (-${result.reduction}%)`);
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
      }
    }
  }

  // Summary
  const totalReduction = ((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1);
  console.log('\n📊 Summary:');
  console.log(`  Images processed: ${processedCount} × 2 sizes = ${processedCount * 2} files`);
  console.log(`  Original size:    ${formatBytes(totalOriginalSize)}`);
  console.log(`  Optimized size:   ${formatBytes(totalNewSize)}`);
  console.log(`  Total reduction:  ${totalReduction}%`);
  console.log(`  Space saved:      ${formatBytes(totalOriginalSize - totalNewSize)}`);
  console.log('\n✅ Optimization complete!');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
