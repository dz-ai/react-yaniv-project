import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {handleKeypress} from "../Hooks-and-Util/utilsFun";
import {OpenGameContainer} from "./OpenGamePageStyle";

export function OpenGamePage() {
    const navigate = useNavigate();

    const [yourName, setYourName] = useState('');
    const [numOfPlayers, setNumOfPlayers] = useState(0);
    const [message, setMessage] = useState({status: false, message: ''});


    const goToGame = () => {
        if (numOfPlayers > 4) {
            setMessage( {status: true, message: 'max num of players is 4'});
        } else if (numOfPlayers < 2) {
            setMessage( {status: true, message: 'min num of players is 2'});
        } else if (yourName === '') {
            setMessage({status: true, message: 'please enter your name'});
        } else {
            navigate('/gamePage', {state: {yourName: yourName, numOfPlayers: numOfPlayers}});
        }
    };

    return (
        <OpenGameContainer onKeyDown={(e) => handleKeypress(e, goToGame)}>
            <h1>Yaniv</h1>
            <h2>Welcome! Please Enter Your Name</h2>

            <input type="text"
                   onChange={(e) => setYourName(e.target.value)}
                   placeholder="name"/>
            <h3>Chose Num Of Players</h3>
            <input type="number"
                   onChange={(e) => setNumOfPlayers(+(e.target.value))}
                   placeholder="0"
                   max={4}
                   min={0}/>

            {message && <p>{message.message}</p>}
        </OpenGameContainer>
    );
};