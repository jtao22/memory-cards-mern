import React, {useEffect, useState} from 'react';
import useStyles from './formstyles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {createPost,changePost} from '../../actions/posts';

const Form = ({currentID, setcurrentID}) =>{
    const classes = useStyles();
    const post = useSelector((state) => currentID ? state.posts.find((index) => index._id === currentID) : null);
    useEffect(() => {
        if(post){
            setPostData(post);
        }
    },[post]);
    const [postData,setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        picture:''
    });
    const clear = () => {
        setcurrentID(null);
        setPostData({creator:'',title:'',message:'',tags:'',picture:''});
    }
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentID){
            dispatch(changePost(currentID, postData));
            clear();
        }
        else{
            dispatch(createPost(postData));
            clear();
        }
    }
    return(
        <Paper className = {classes.paper}>
            <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            <Typography variant = "h6" > {currentID ? 'Editing' : 'Posting'} a Memory</Typography>
            <TextField 
                name="creator" variant = "outlined" 
                label = "Creator" fullWidth
                value={postData.creator} onChange = {(e) => setPostData({...postData, creator: e.target.value})}
            />
            <TextField 
                name="title" variant = "outlined" 
                label = "Title" fullWidth
                value={postData.title} onChange = {(e) => setPostData({...postData, title: e.target.value})}
            />
            <TextField 
                name="message" variant = "outlined" 
                label = "Message" fullWidth
                value={postData.message} onChange = {(e) => setPostData({...postData, message: e.target.value})}
            />
            <TextField 
                name="tags" variant = "outlined" 
                label = "Tags" fullWidth
                value={postData.tags} onChange = {(e) => setPostData({...postData, tags: e.target.value.split(`,`)})}
            />
            <div className = {classes.fileInput}>
                <FileBase
                    type = "file"
                    multiple = {false}
                    onDone = {({base64}) => setPostData({...postData, picture: base64})}
                />
            </div>
            <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = "large" type = "submit" fullWidth>Submit!</Button>
            <Button  variant = "contained" color = "secondary" size = "small" onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}
export default Form;
