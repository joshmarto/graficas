import axios from 'axios';
import React,{Component} from 'react';
import { read, utils } from 'xlsx';


class UploadFile extends Component { 

    state = { 

      selectedFile: null
    }; 
     
    onFileChange = event => { 
      if (event.target.files[0].type === 'application/xlsx' || event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        console.log( event.target.files[0]);
        this.setState({ selectedFile: event.target.files[0] }); 
      } else{
        this.setState({ selectedFile: false, errorMessage: 'Tipo de archivo erroneo' });
      }
    };

    readFile = data => {
        const reader = new FileReader();
        reader.onLoad = event => {
            console.log('still here');
            const bStr = event.target.result;
            const wb = read(bStr, {type: 'binary'});
            const wsName = wb.SheetNames[0];
            const ws = wb.Sheets[wsName];
            const resultData = utils.sheet_to_cvs(ws, {header: 1});
            console.log(`Data: ${resultData}`);
            return resultData;
        };
    };
     
    onFileUpload = () => { 
      const formData = new FormData(); 
     
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      console.log(this.state.selectedFile); 
     
      axios.post("api/uploadfile", formData); 
    }; 
     
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div className="auth__box-container">
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <span>"{ typeof this.readFile(this.state.selectedFile[0]) }"</span>
          </div>
        ); 
      } else { 
        return ( 
          <div className="auth__box-container"> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
            <p>{this.state.errorMessage}</p>
          </div> 
        ); 
      } 
    }; 
     
    render() { 
      return ( 
        <div className="auth__box-container"> 
            <h1 className="auth__title"> 
              Graficas de Datos
            </h1> 
            <h3> 
              File Upload using React! 
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload} className="btn-primary"> 
                  Upload! 
                </button> 
            </div> 
          {this.fileData()} 
        </div> 
        ); 
    } 
} 
  
export default UploadFile;
  
