import Head from "next/head";
import { NamProfile, PhongProfile,VietProfile,ToanProfile } from "../quem-somos";
import Container from "./styles";

interface ISocial {
    facebook: string;
    github: string;
    instagram?: string;
    email: string;
}

const SocialMedia = (social: ISocial) => {
    return (
        <>
            <a href={'mailto:' + social.email} className="email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>Email: {social.email}</a>
            <div className="social">
                <a href={social.facebook} target='new_blank'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" /></a>
                <a href={social.github} target='new_blank'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" /></a>
                <a href={social.instagram} target='new_blank'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/640px-Instagram_icon.png" /></a>
            </div>
        </>
    )
}

export default function Contato() {
    return (
        <>
            <Head>
                <title>Liên hệ</title>
            </Head>
            <Container>
                <h1>Liên hệ với chúng tôi!</h1>
                <section>
                    <PhongProfile />
                    <SocialMedia facebook="https://www.facebook.com/PhongVan.Dvfb/"
                        github=""
                        instagram="https://www.instagram.com/"
                        email="phongvan.socialmedia@gmail.com"
                        key={1} />
                    <hr />
                    <NamProfile />
                    <SocialMedia facebook="https://www.facebook.com/nhunam23"
                        github=""
                        instagram="https://www.instagram.com/"
                        email="donhunam@gmail.com"
                        key={2} />
                    <hr />
                    <VietProfile />
                    <SocialMedia facebook="https://www.facebook.com/profile.php?id=100009094605759"
                        github=""
                        instagram="https://www.instagram.com/"
                        email="theviet@gmail.com"
                        key={3} />
                    <hr />
                    <ToanProfile />
                    <SocialMedia facebook="https://www.facebook.com/thientoan.18012002"
                        github=""
                        instagram="https://www.instagram.com/"
                        email="nguyenthientoan@gmail.com"
                        key={4} />
                </section>
            </Container>
        </>
    );
}
