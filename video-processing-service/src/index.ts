import express from "express";
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000; // 3000 is default port for express apps

// req(uest), res(ponse) 
app.post('/process-video', (req, res) => {

  // Get the path of the input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  // Check if the input file path is defined
  if (!inputFilePath || !outputFilePath) {
    return res.status(400).send('Bad Request: Missing file path');
  }

  // Create the ffmpeg command
  ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', function() {
        console.log('Processing finished successfully');
        res.status(200).send('Processing finished successfully');
    })
    .on('error', function(err: any) {
        console.log('An error occurred: ' + err.message);
        res.status(500).send('An error occurred: ' + err.message);
    })
    .save(outputFilePath);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
