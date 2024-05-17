# Gishta Promotions Frontend

This is the frontend application for Gishta Promotions, a platform designed to create and generate promotional materials for local festivals, concerts, and events. Users can provide detailed descriptions, record audio, and upload media to generate promotional posters and social media content. The backend handles the content generation, image creation, and translation tasks.

## Link to Backend Repo
[https://github.com/ChiromboKenT/backend](https://github.com/ChiromboKenT/backend)


## Project Description

Gishta Promotions is an AI-driven platform that helps users generate promotional materials for local events. The key features include:
1. **Audio Transcription and Translation**: Users can record audio descriptions, which are transcribed and translated into English using the backend services.
2. **Content Generation**: The platform uses Google Vertex AI (Gemini 1.5 Pro) to generate structured promotional content.
3. **Image Generation**: OpenAI's DALL-E is used to create background images for the promotional posters.
4. **Poster Rendering**: Generated content and images are used to create a visually appealing HTML-based poster.

## Key Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for creating responsive and visually appealing components.
- **React H5 Audio Player**: A React component for playing back audio files.
- **React-Mic**: A React component for recording audio directly from the browser.

### Backend
- **Flask**: A lightweight WSGI web application framework in Python.
- **Google Vertex AI (Gemini 1.5 Pro)**: Used for content generation.
- **OpenAI DALL-E**: Used for generating background images.
- **Google Cloud Translation**: For translating text between different languages.
- **Transformers (Hugging Face)**: For automatic speech recognition (ASR) to transcribe audio.
- **Pydub**: For audio processing.
- **FFmpeg**: For handling audio conversions and manipulations.
- **imgkit**: For converting HTML to images.

## Running the Application

### Backend
1. **Clone the Backend Repository**:
    ```bash
    git clone https://github.com/ChiromboKenT/backend
    cd backend
    ```

2. **Create a Virtual Environment and Install Dependencies**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the backend directory and add the necessary environment variables.
    ```plaintext
    GOOGLE_APPLICATION_CREDENTIALS=<path-to-google-credentials-json>
    OPENAI_API_KEY=<your-openai-api-key>
    ```

4. **Run the Backend Server**:
    ```bash
    flask run
    ```

### Frontend
1. **Clone the Frontend Repository**:
    ```bash
    git clone https://github.com/ChiromboKenT/frontend
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` File**:
    ```plaintext
    REACT_APP_BACKEND_URL=http://localhost:5000  # Adjust this based on your backend server address
    ```

4. **Run the Frontend Development Server**:
    ```bash
    npm start
    ```

### Deployment
The frontend is deployed on Vercel. You can access the live demo at:
[https://gishta-promo-frontend.vercel.app/](https://gishta-promo-frontend.vercel.app/)

## Project Structure
```plaintext
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── DescriptionSection.js
│   │   ├── PosterSection.js
│   │   ├── SocialMediaSection.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   ├── theme.js
│   └── ...
├── .env
├── package.json
└── ...
```

## Contributing
Feel free to open issues or submit pull requests with improvements or bug fixes.

## License
This project is licensed under the MIT License.

---

For more information, visit the project repository or contact the project maintainers.