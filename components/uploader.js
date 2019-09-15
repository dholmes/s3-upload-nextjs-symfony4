import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import getConfig from 'next/config';
import qs from 'querystring';

const { publicRuntimeConfig } = getConfig();

class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state = {success: null};
      }

    handleDrop = async (files) => {
        var file = files[0];

        this.setState({success: null, imageUrl: null, status: "Uploading..."});

        const result = await axios.post(`${publicRuntimeConfig.apiPath}/upload`, 
            qs.stringify({
            name: file.name,
            type: file.type,
            size: file.size
          }),
          {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
          })
        
        const signedUrl = result.data.signedUrl;
        const imageUrl = result.data.imageUrl;
        
        const options = {
            headers: {
                'Content-Type': file.type,
            }
        };

        return axios.put(signedUrl,file,options)
        .then(result => {
            this.setState({
                success: true,
                status: "Success!", 
                imageUrl: imageUrl
            });
        })
        .catch(error => {
            alert("ERROR " + JSON.stringify(error));
            this.setState({success: false, status: "Failed"});
        });
    }

    loading() {

    }

    render() {
      return (
        <Dropzone onDrop={ this.handleDrop }>
            {({getRootProps, getInputProps, isDragActive}) => (
            <div>
                <div {...getRootProps()} className={isDragActive ? "panel drag drag-active" : "panel drag"}>
                    <input {...getInputProps()} />
                    <div>{isDragActive ? "Drop to Upload!" : 'Click me or drag a file to upload!'}</div>
                    <div>Current API Path is: {`${publicRuntimeConfig.apiPath}/upload`}</div>
                </div>
                <div className="panel info">
                    <div>{this.state.status}</div>
                    <div><a href={this.state.imageUrl}>{this.state.imageUrl}</a></div>
                    <img src={this.state.imageUrl}/>
                </div>
                <style jsx>{`
                    .panel { margin: 0 3rem; padding: 3rem;}
                    .drag { border: 1px solid #ccc; background: #eee }
                    .drag-active { border: 1px solid #ccc; background: pink }
                    .info { margin-top: 2rem; background:none }
                `}</style>
            </div>
            )}
        </Dropzone>
      );
    }
}

export default Uploader;