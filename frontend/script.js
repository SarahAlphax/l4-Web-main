// document.addEventListener('DOMContentLoaded', async () => {
//   await loadImageGallery();
//   await populateImageSelect();
// });

// // Upload form handler
// const uploadForm = document.getElementById('uploadForm');
// if (uploadForm) {
//   uploadForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const fileInput = document.getElementById('imageUpload');
//     const messageDiv = document.getElementById('uploadMessage');

//     if (!fileInput || !messageDiv) return;

//     if (!fileInput.files || fileInput.files.length === 0) {
//       messageDiv.textContent = 'Please select a file';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', fileInput.files[0]);

//     try {
//       const response = await fetch('/api/images/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         messageDiv.textContent = 'Image uploaded successfully!';
//         await loadImageGallery();
//         await populateImageSelect();
//         uploadForm.reset();
//       } else {
//         messageDiv.textContent = result.error || 'Upload failed';
//       }
//     } catch (error) {
//       messageDiv.textContent = 'Error uploading image';
//       console.error('Upload error:', error);
//     }
//   });
// }

// const resizeForm = document.getElementById('resizeForm');
// if (resizeForm) {
//   resizeForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const imageSelect = document.getElementById('imageSelect');
//     const widthInput = document.getElementById('widthInput');
//     const heightInput = document.getElementById('heightInput');
//     const resultDiv = document.getElementById('resizeResult');

//     if (!imageSelect || !widthInput || !heightInput || !resultDiv) return;

//     const filename = imageSelect.value;
//     const width = widthInput.value;
//     const height = heightInput.value;
//     const resizedUrl = `/api/images/resize?filename=${encodeURIComponent(filename)}&width=${width}&height=${height}`;
//     const fullUrl = location.origin + resizedUrl;

//     if (!filename || !width || !height) {
//       resultDiv.textContent = 'Please provide all required inputs';
//       return;
//     }

//     try {
//       const response = await fetch(resizedUrl);

//       if (response.ok) {
//         resultDiv.innerHTML = `
//           <p>Resized image:</p>
//           <a href="${fullUrl}" target="_blank">${fullUrl}</a><br>
//           <img src="${fullUrl}" alt="Resized image" class="resized-image" style="max-width: 300px;">
//         `;
//       } else {
//         const errorText = await response.text();
//         resultDiv.textContent = errorText || 'Resizing failed';
//       }
//     } catch (error) {
//       resultDiv.textContent = 'Error resizing image';
//       console.error('Resize error:', error);
//     }
//   });
// }

// // Load image gallery
// async function loadImageGallery() {
//   const gallery = document.getElementById('imageGallery');
//   if (!gallery) return;

//   try {
//     const response = await fetch('/api/images/list');
//     const images = await response.json();

//     gallery.innerHTML = images.map((img) => `
//       <div class="gallery-item">
//         <img src="/uploads/${img}" alt="${img}">
//         <p>${img}</p>
//       </div>
//     `).join('');
//   } catch (error) {
//     gallery.innerHTML = '<p>Error loading images</p>';
//     console.error('Gallery load error:', error);
//   }
// }

// // Populate image select dropdown
// async function populateImageSelect() {
//   const select = document.getElementById('imageSelect');
//   if (!select) return;

//   try {
//     const response = await fetch('api/images/list');
//     const images = await response.json();

//     // Remove all options except the first
//     const placeholder = select.options[0]?.value === '' ? 1 : 0;
//     while (select.options.length > placeholder) {
//       select.remove(placeholder);
//     }

//     images.forEach((img) => {
//       const option = document.createElement('option');
//       option.value = img;
//       option.textContent = img;
//       select.appendChild(option);
//     });
//   } catch (error) {
//     console.error('Image list load error:', error);
//   }
// }


document.addEventListener('DOMContentLoaded', async () => {
  await loadImageGallery();
  await populateImageSelect();
});

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('imageUpload');
    const messageDiv = document.getElementById('uploadMessage');

    if (!fileInput || !messageDiv) return;

    if (!fileInput.files || fileInput.files.length === 0) {
      messageDiv.textContent = 'Please select a file';
      return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = 'Image uploaded successfully!';
        const uploadedImage = result.filename || fileInput.files[0].name;
        const gallery = document.getElementById('imageGallery');

        if (gallery) {
          const wrapper = document.createElement('div');
          wrapper.className = 'gallery-item';
          wrapper.innerHTML = `
            <img src="/uploads/${uploadedImage}" alt="${uploadedImage}">
            <p>${uploadedImage}</p>
          `;
          gallery.appendChild(wrapper);
        }

        await populateImageSelect();
        uploadForm.reset();
      } else {
        messageDiv.textContent = result.error || 'Upload failed';
      }
    } catch (error) {
      messageDiv.textContent = 'Error uploading image';
      console.error('Upload error:', error);
    }
  });
}

const resizeForm = document.getElementById('resizeForm');
if (resizeForm) {
  resizeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const imageSelect = document.getElementById('imageSelect');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const resultDiv = document.getElementById('resizeResult');

    if (!imageSelect || !widthInput || !heightInput || !resultDiv) return;

    const filename = imageSelect.value;
    const width = widthInput.value;
    const height = heightInput.value;
    const resizedUrl = `/api/images/resize?filename=${encodeURIComponent(filename)}&width=${width}&height=${height}`;
    const fullUrl = location.origin + resizedUrl;

    if (!filename || !width || !height) {
      resultDiv.textContent = 'Please provide all required inputs';
      return;
    }

    try {
      const response = await fetch(resizedUrl);

      if (response.ok) {
        resultDiv.innerHTML = `
          <p>Resized image:</p>
          <a href="${fullUrl}" target="_blank">${fullUrl}</a><br>
          <img src="${fullUrl}" alt="Resized image" class="resized-image" style="max-width: 300px;">
        `;
      } else {
        const errorText = await response.text();
        resultDiv.textContent = errorText || 'Resizing failed';
      }
    } catch (error) {
      resultDiv.textContent = 'Error resizing image';
      console.error('Resize error:', error);
    }
  });
}

async function loadImageGallery() {
  const gallery = document.getElementById('imageGallery');
  if (!gallery) return;

  try {
    const response = await fetch('/api/images/list');
    const images = await response.json();

    gallery.innerHTML = images.map((img) => `
      <div class="gallery-item">
        <img src="/uploads/${img}" alt="${img}">
        <p>${img}</p>
      </div>
    `).join('');
  } catch (error) {
    gallery.innerHTML = '<p>Error loading images</p>';
    console.error('Gallery load error:', error);
  }
}

async function populateImageSelect() {
  const select = document.getElementById('imageSelect');
  if (!select) return;

  try {
    const response = await fetch('/api/images/list');
    const images = await response.json();

    const placeholder = select.options[0]?.value === '' ? 1 : 0;
    while (select.options.length > placeholder) {
      select.remove(placeholder);
    }

    images.forEach((img) => {
      const option = document.createElement('option');
      option.value = img;
      option.textContent = img;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Image list load error:', error);
  }
}
