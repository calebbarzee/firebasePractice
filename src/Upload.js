import {useState} from 'react';
import { db, storage } from './firebase-config';

function Upload() {
  const [image , setImage] = useState(null);
  const [name , setName] = useState("");
  const [owner , setOwner] = useState("");
  const [category , setCategory] = useState("");
  const [url , setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const imgUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            dataUpload(url)
          });
      }
    )
  };
  
    const dataUpload = (url) => {
      db.collection("boxes").add({
      imgURL: url,
      boxName: name,
      owner: owner,
      category: category
      })
      setName("");
      setOwner("");
      setCategory("");
    };

      return (
        <div className="App">
          <center>
            <form className="form" onSubmit={imgUpload}>
              <h1>Please upload your desired image and data.</h1>
              <input type="file" onChange={handleChange}/>
              <label>name</label>
              <input type="text" value={name} className="nameInput" onChange={(e) => {setName(e.target.value)} }/>
              <label>owner</label>
              <input type="text" value={owner} className="ownerInput" onChange={(e) => {setOwner(e.target.value)} } />
              <label>category</label>
              <input type="text" value={category} className="categoryInput" onChange={(e) => {setCategory(e.target.value)} } />
              <button type="submit">Upload</button>
            </form> 
          </center>
        </div>
      );
   
}

export default Upload;

