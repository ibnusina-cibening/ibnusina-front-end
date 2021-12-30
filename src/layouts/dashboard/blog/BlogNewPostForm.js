import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import {useSnackbar} from 'notistack'
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// utils
//
import { QuillEditor } from 'src/components/editor';
import {mutation} from 'src/db/query/blog/createPost';
import { useMutation, useQuery } from '@apollo/client';
import { query } from 'src/db/query/blog/getTK';
import { MIconButton } from 'src/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// import { UploadSingleFile } from '../../upload';
//
// import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));


// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [createPost] = useMutation(mutation);
  const [Categories, setCategory] = useState([]);
  const [Tags, setTag] = useState([]);
  const getCT = useQuery(query, {fetchPolicy: 'cache-first'});
  
  useEffect(()=>{
    if(getCT.data){
      setCategory(getCT.data.allCategory);
      setTag(getCT.data.allTag);
    }
  }, [getCT])

  // const handleOpenPreview = () => {
  //   setOpen(true);
  // };

  // const handleClosePreview = () => {
  //   setOpen(false);
  // };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(10).required('Content is required')
    // cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      tag: ['sejarah'],
      tagId: ['1603b0d7-d025-4c9d-a90d-ac1aae214223'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      category: ['hiburan'],
      categoryId: ['b074541c-fc09-41c4-a3a6-b62c1751c0a4']
    },
    // validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const val = {
        ...values,
        published: (values.publish ? 2 : 1),
      };
      try {
        const msg = (await createPost({variables: val})).data.addPost;
        resetForm();
        // handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar(msg, {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        setSubmitting(false);
        // console.log(error);
        enqueueSnackbar(error.toString(), {variant: 'error'});
      }
    }
  });
  
  // const Coba = ({type}) => {
  //   const { data, error, loading } = useQuery(query, {fetchPolicy: 'cache-first'});
  //   if(error || loading) return null;
  //   const CT = {'category':[data.allCategory, 'Category'],'tag':[data.allTag, 'Tags']};
  //   return (
  //     <Autocomplete
  //       multiple
  //       freeSolo
  //       value={values[type]}
  //       onChange={(event, newValue) => {
  //         const nVal = newValue.map(v => CT[type][0].find(obj => obj.title === v).id);
  //         setFieldValue(type, newValue);
  //         setFieldValue(type + 'Id', nVal);
  //       }}
        
  //       options={CT[type][0].map(opt => opt.title)}
  //       renderTags={(value, getTagProps) =>
  //         value.map((option, index) => (
  //           <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
  //         ))
  //       }
  //       renderInput={(params) => <TextField {...params} label={CT[type][1]} />}
  //     />
  //   )
  // }
  
  
  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
  
  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       setFieldValue('cover', {
  //         ...file,
  //         preview: URL.createObjectURL(file)
  //       });
  //     }
  //   },
  //   [setFieldValue]
  // );



  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Description"
                    {...getFieldProps('summary')}
                    error={Boolean(touched.summary && errors.summary)}
                    helperText={touched.summary && errors.summary}
                  />

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <TextField
                      fullWidth
                      label="Cover"
                      {...getFieldProps('imageUrl')}
                      error={Boolean(touched.imageUrl && errors.imageUrl)}
                      helperText={touched.imageUrl && errors.imageUrl}
                    />
                    {/* <LabelStyle>Cover</LabelStyle> */}
                    {/* <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    /> */}
                    {/* {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )} */}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />

                    <FormControlLabel
                      control={<Switch {...getFieldProps('comments')} checked={values.comments} />}
                      label="Enable comments"
                      labelPlacement="start"
                      sx={{ mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tag}
                    onChange={(event, newValue) => {
                      const nVal = newValue.map(v => Tags.find(obj => obj.title === v).id);
                      setFieldValue('tag', newValue);
                      setFieldValue('tagId', nVal);
                    }}
                    
                    options={Tags.map(opt => opt.title)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label={Tags.title} />}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.category}
                    onChange={(event, newValue) => {
                      const nVal = newValue.map(v => Categories.find(obj => obj.title === v).id);
                      setFieldValue('category', newValue);
                      setFieldValue('categoryId', nVal);
                    }}
                    
                    options={Categories.map(opt => opt.title)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label={Categories.title} />}
                  />
                    {/* <Coba type='tag'/>
                    <Coba type='category'/> */}
                  {/* <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="Tags" />}
                  /> */}

                  <TextField fullWidth label="Meta title" {...getFieldProps('metaTitle')} />

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="Meta description"
                    {...getFieldProps('metaDescription')}
                  />

                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={(e)=>e.preventDefault}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      {/* <BlogNewPostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} /> */}
    </>
  );
}
