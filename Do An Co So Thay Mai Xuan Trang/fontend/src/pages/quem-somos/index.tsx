import axios from "axios";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import Container from "./styles";

export const PhongProfile = () => {
    const [bioPhong, setbioPhong] = useState();

    return (
        <article>
            <img src="https://i.upanh.org/2022/12/27/phong.jpg" alt="" />
            <p><a href="" target='new_blank'>Phong Văn</a><br />
                {bioPhong}<br />
                thành viên của nhóm đồ án cơ sở
                 <br /> <br />
                 
            </p>
        </article>
    )
};

export const NamProfile = () => {
    const [bionam, setbionam] = useState();

    return (
        <article>
            <img src="https://i.upanh.org/2022/12/27/nam.jpg" alt="" />
            <p><a href="" target='new_blank'>Như Nam</a> <br />
                {bionam}<br />
                thành viên của nhóm đồ án cơ sở
                 <br /><br />
                 
            </p>
        </article>
    )
};
export const VietProfile = () => {
    const [bionam, setbionam] = useState();

    return (
        <article>
            <img src="https://i.upanh.org/2022/12/27/viet.jpg" alt="" />
            <p><a href="" target='new_blank'>Thế Việt</a> <br />
                {bionam}<br />
                thành viên của nhóm đồ án cơ sở
                 <br /><br />
                 
            </p>
        </article>
    )
};
export const ToanProfile = () => {
    const [biotoan, setbiotoan] = useState();

    useEffect(() => {
        
    }, []);

    return (
        <article>
            <img src="https://i.upanh.org/2022/12/27/toan.jpg" alt="" />
            <p><a href="" target='new_blank'>Thiện Toàn</a> <br />
                {biotoan}<br />
                thành viên của nhóm đồ án cơ sở
                 <br /><br />
                 
            </p>
        </article>
    )
};

export default function QuemSomos() {
    return (
        <>
            <Head>
                <title>Giới thiệu</title>
            </Head>
            <Container>
                <h1>Dự án</h1>
                <p>Dự án web app shop api</p>
                <h1>Thành viên</h1>
                <section>
                    <PhongProfile />
                    <hr />
                    <NamProfile />
                    <hr />
                    <VietProfile />
                    <hr />
                    <ToanProfile />
                    <hr />
                </section>
                <a className="contact" onClick={() => router.push('/contato')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" /></svg>
                    <h4>Liên hệ với chúng tôi</h4>
                </a>
            </Container>
        </>
    )
}
