/**
 *
 *  This Function shows you how to reach and utilise the temporary storage under the Function layer, mainly for single-invocation jobs
 *  For example, on each invocation we can create a file based on user data and use it accordingly
 *
 *  IMPORTANT: Do NOT treat this storage as long term storage or for personal data that need to persist.
 *  The contents get deleted whenever the associated container is brought down, so this function is useful for one time actions
 *
 */

const fs = require('fs');
// const path = require('path');
const os = require('os');

exports.handler = function (context, event, callback) {

  console.log("CONTEXT:");
  console.log(context);
  console.log("EVENT:");
  console.log(event);

  // const data = event.Body + "\n";
  const tempDir = os.tmpdir();
  console.log("temp directory: " + tempDir);
  const tempFile = tempDir + "/tempfile.txt";
  console.log("tempFile: " + tempFile);
  const catFile = fs.readFileSync(tempFile, "utf8");
  console.log("catFile: " + catFile);

  /* We create a text file and we put some data in it*/
  fs.appendFile(tempFile, 'Hello World!\n', (err) => {
      if (err) return callback(err);

      // We read the contents of the temporary directory
      // For multiple files you can create a loop
      fs.readdir(os.tmpdir(), function (err, files) {
        if (err) return callback(err);
        return callback(
          null,
          `Files in temporary directory:\n\n ${files.join('\n ')} \n\n` +
          `Contents of tempFile:\n\n${catFile}`
          );
      });
    }
  );
};
