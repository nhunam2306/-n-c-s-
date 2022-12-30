import styled from "styled-components";

export default styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    button.rec-dot {
        background-color: #fff;
    }
    
    .products-section {
        background-color: #fff;
        border-radius: 2rem;
        padding: 1rem;
        height: 30rem;
        position: relative;
        text-align: center;
    }

    article {
        display: flex;
        max-width: 22rem;
        height: 22rem;
        flex-direction: column;
        justify-content: end;
        align-items: center;

        gap: 0.5rem;

        img {
            height: 8rem;
            object-fit: contain;
        }
        
        button {
            font-size: 1.1rem;
        }

        svg {
            display: none;
        }
    }

    @media (min-width: 768px) {
        width: 80vw;
        margin: auto;

        article > button {
            font-size: 1.4rem;
            padding: initial 1rem;
            
            svg {
                height: 1.4rem;
                display: block;
            }
        }
    }
`;
