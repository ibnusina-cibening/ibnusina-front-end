import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Page from 'src/components/Page';
import MainLayout from 'src/layouts/main';
import Body from 'src/components/pendaftaran/Body';


const RootStyle: FC<any> = styled(Page)({
    height: '100%',
});

export default function Pendaftaran(){
    return (
        <MainLayout>
            <RootStyle
                title='IBNU SINA | Pendaftaran'
                id='move_top'
            >
                <Body/>
            </RootStyle>
        </MainLayout>
    );
}