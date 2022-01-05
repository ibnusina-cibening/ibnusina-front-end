import { WhatsApp, Mail } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";


export default function Map(){
    return (
        <Grid item>
            <Grid container spacing={4} alignItems='center'>
                <Grid item xs={12} md={6}>
                    <iframe loading="lazy" style={{border: 0}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.1279683205175!2d106.67748391475402!3d-6.631024366666352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69da804b39f4af%3A0x25c1e14653303a9f!2sPonpes%20Ibnu%20Sina!5e0!3m2!1sid!2sid!4v1578439462165!5m2!1sid!2sid" width="100%" height="300" frameBorder="0" allowfullscreen="allowfullscreen" />

                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h5' component='p' sx={{paddingBottom: 2, textAlign: 'center'}} children='Sekretariat' />
                    <Typography sx={{paddingBottom: 3, textAlign: 'center'}}>
                        Jl. Cikampak-Segog km. 09, Kampung Pasar Kemis, Samping Kompleks Rindam Jaya, Ds. Cibening, Kec. Pamijahan, Kabupaten Bogor.
                    </Typography>
                    <Grid container direction='row' alignItems='center' spacing={3}>

                        <Grid item md={6} xs={12}>
                            <Grid container alignItems='center' direction='column'>
                                <Mail sx={{marginBottom: 1}}/> 
                                <p>
                                    mail@ibnusina.sch.id
                                </p>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Grid container alignItems='center' direction='column'>
                                <WhatsApp sx={{marginBottom: 1}}/>
                                <p style={{textAlign: 'center'}}>
                                    0812-8394-6572, 0817-0314-5891, 0857-7132-3834 
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Typography>
                        Email: 
                        Whatsapp:
                         (Ust. Sidiq) /  (Ust. Saepullah) /  (Ustzh. Handayani)
                    </Typography> */}
                </Grid>
            </Grid>
        </Grid>
    )
}