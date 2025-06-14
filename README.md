# Image Processing API

An API for resizing images and managing an image gallery.

## Features

- Resize JPEG images with specified width and height
- Upload new images to the gallery
- Caching of resized images for better performance
- Responsive frontend interface

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the server: `npm start`

## Usage

### API Endpoints

- `GET /api/images/resize?filename={name}&width={num}&height={num}`
  - Resizes the specified image to the given dimensions
  - Returns a URL to the resized image

- `POST /api/images/upload`
  - Uploads a new JPEG image to the gallery
  - Accepts a multipart/form-data with an 'image' field

### Frontend

Access the frontend at `http://localhost:3000`

- Upload new images using the upload form
- Select an image from the gallery and specify dimensions to resize
- View and access resized images

## Testing

Run tests with: `npm test`

Tests include:
- Image processing functionality
- API endpoints

## Development

- Format code: `npm run format`
- Lint code: `npm run lint`
- Run in development mode: `npm run dev`