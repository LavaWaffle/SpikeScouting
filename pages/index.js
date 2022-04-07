import ImageMarker, { Marker } from "react-image-marker";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ModalRel from "../components/ModalRel";
import addGame from '../components/firebase.js'
// import 'flowbite';
let cMarkers = [];

export default function Home() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (markers.length > 0) {
      setTimeout(() => {
        setShowModal(true);
      }, 50);
    }
    console.log(markers)
  }, [markers]);

  const [showModal, setShowModal] = useState(false);

  const [favorite, setFavorite] = useState("got in");

  const handleGotInChange = () => {
    setFavorite("got in");
  };

  const handleBounceOut = () => {
    setFavorite("bounce out");
  };

  const handleMissClose = () => {
    setFavorite("miss close");
  };

  const handleMissFar = () => {
    setFavorite("miss far");
  };

  const handleSubmit = () => {
    setShowModal(false);
    cMarkers = [
      ...cMarkers,
      {
        ...markers[markers.length-1],
        type: favorite
      }
    ]
    console.log(cMarkers)
  };

  const [gameOverModel, setGameOverModel] = useState(false);

  const [gameID, setGameID] = useState('')
  const handleGameID = (e) => {
    setGameID(e.target.value)
  }

  const [won, setWon] = useState('red')
  const [weWin, setWeWin] = useState('win');
  const [autoBalls, setAutoBalls] = useState(0);
  const [climbBar, setClimbBar] = useState('low');
  const [climbRP, setClimbRP] = useState(0);
  const [cargoRP, setCargoRP] = useState(0);
  const [totalRP, setTotalRP] = useState(0);

  const handleOverModel = () => {
    addGame(1, markers, cMarkers, won, weWin, autoBalls, climbBar, climbRP, cargoRP, totalRP);
    setGameOverModel(false)

  }

  return (
    <>
      <Modal show={showModal} title={"Shot Type"} cancleable={true} onClose={() => {
        setShowModal(false)
        markers.splice(-1)
      }}>
        <h3>What type of shot was it?</h3>
        <div className="space-x-3 mt-5 flex justify-around">
          <RadioButton
            label="Got In"
            value={favorite === "got in"}
            onChange={handleGotInChange}
          />
          <RadioButton
            label="Bounce Out"
            value={favorite === "bounce out"}
            onChange={handleBounceOut}
          />
          <RadioButton
            label="Miss Close"
            value={favorite === "miss close"}
            onChange={handleMissClose}
          />
          <RadioButton
            label="Miss Far"
            value={favorite === "miss far"}
            onChange={handleMissFar}
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 mt-5 p-3 rounded-lg hover:bg-blue-400 transition-all duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </Modal>
      <ImageMarker
        src="field.png"
        markers={markers}
        onAddMarker={(marker) => setMarkers([...markers, marker])}
      />
      <a onClick={() => setGameOverModel(true)} className="absolute top-0 right-0 m-4 bg-blue-500 mt-5 p-3 rounded-lg hover:bg-blue-400 transition-all duration-200 ease-in-out text-bold text-white">Game Over</a>
      <ModalRel show={gameOverModel} title={"Game Details"} cancleable={true} abs={false}>
        <h3>Game #</h3>
        <input type="text" className="bg-blue-300 w-full rounded p-2" value={gameID} onChange={handleGameID} />
        <h3>Who Won?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="Red"
            value={won === "red"}
            Icon={() => <div className="bg-red-500 w-16 aspect-square rounded-lg"></div>}
            onChange={() => setWon('red')}
          />
          <RadioButton
            label="Blue"
            value={won === "blue"}
            Icon={() => <div className="bg-blue-500 w-16 aspect-square rounded-lg"></div>}
            onChange={() => setWon('blue')}
          />
        </div>
        <h3 className="mt-2">Did we win?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="Win"
            value={weWin === "win"}
            Icon={() => <div className="text-green-500 text-center text-7xl px-[0.3rem]">W</div>}
            onChange={() => setWeWin('win')}
          />
          <RadioButton
            label="Lose"
            value={weWin === "lose"}
            Icon={() => <div className="text-red-500 text-center text-7xl px-[1.3rem]">L</div>}
            onChange={() => setWeWin('lose')}
          />
          <RadioButton
            label="Tie"
            value={weWin === "tie"}
            Icon={() => <div className="text-gray-500 text-center text-7xl px-[1.3rem]">T</div>}
            onChange={() => setWeWin('tie')}
          />
        </div>
        <h3 className="mt-2">Auto Balls Scored?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="0"
            value={autoBalls === 0}
            Icon={() => <div className="text-blue-500 text-center text-7xl px-[1.3rem]">0</div>}
            onChange={() => setAutoBalls(0)}
          />
          <RadioButton
            label="1"
            value={autoBalls === 1}
            Icon={() => <div className="text-blue-600 text-center text-7xl px-[1.3rem]">1</div>}
            onChange={() => setAutoBalls(1)}
          />
          <RadioButton
            label="2"
            value={autoBalls === 2}
            Icon={() => <div className="text-blue-700 text-center text-7xl px-[1.3rem]">2</div>}
            onChange={() => setAutoBalls(2)}
          />
        </div>
        <h3 className="mt-2">Climb bar?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="Low"
            value={climbBar === "low"}
            Icon={() => <div className="text-red-400 text-center text-7xl px-[1.3rem]">L</div>}
            onChange={() => setClimbBar("low")}
          />
          <RadioButton
            label="Middle"
            value={climbBar === "middle"}
            Icon={() => <div className="text-red-500 text-center text-7xl px-[1.3rem]">M</div>}
            onChange={() => setClimbBar("middle")}
          />
          <RadioButton
            label="High"
            value={climbBar === "high"}
            Icon={() => <div className="text-red-600 text-center text-7xl px-[1.3rem]">H</div>}
            onChange={() => setClimbBar("high")}
          />
          <RadioButton
            label="Traversal"
            value={climbBar === "traversal"}
            Icon={() => <div className="text-red-700 text-center text-7xl px-[1.3rem]">T</div>}
            onChange={() => setClimbBar("traversal")}
          />
        </div>
        <h3 className="mt-2">Climb Ranking Point?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="0"
            value={climbRP === 0}
            Icon={() => <div className="text-red-500 text-center text-7xl px-[1.3rem]">0</div>}
            onChange={() => setClimbRP(0)}
          />
          <RadioButton
            label="1"
            value={climbRP === 1}
            Icon={() => <div className="text-blue-500 text-center text-7xl px-[1.3rem]">1</div>}
            onChange={() => setClimbRP(1)}
          />
        </div>
        <h3 className="mt-2">Cargo Ranking Point?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="0"
            value={cargoRP === 0}
            Icon={() => <div className="text-blue-500 text-center text-7xl px-[1.3rem]">0</div>}
            onChange={() => setCargoRP(0)}
          />
          <RadioButton
            label="1"
            value={cargoRP === 1}
            Icon={() => <div className="text-red-500 text-center text-7xl px-[1.3rem]">1</div>}
            onChange={() => setCargoRP(1)}
          />
        </div>
        <h3 className="mt-2">Total Ranking Points?</h3>
        <div className="space-x-3 mt-3 flex justify-around">
          <RadioButton
            label="0"
            value={totalRP === 0}
            Icon={() => <div className="text-blue-400 text-center text-7xl px-[1.3rem]">0</div>}
            onChange={() => setTotalRP(0)}
          />
          <RadioButton
            label="1"
            value={totalRP === 1}
            Icon={() => <div className="text-blue-500 text-center text-7xl px-[1.3rem]">1</div>}
            onChange={() => setTotalRP(1)}
          />
          <RadioButton
            label="2"
            value={totalRP === 2}
            Icon={() => <div className="text-blue-600 text-center text-7xl px-[1.3rem]">2</div>}
            onChange={() => setTotalRP(2)}
          />
          <RadioButton
            label="3"
            value={totalRP === 3}
            Icon={() => <div className="text-blue-700 text-center text-7xl px-[1.3rem]">3</div>}
            onChange={() => setTotalRP(3)}
          />
          <RadioButton
            label="4"
            value={totalRP === 4}
            Icon={() => <div className="text-blue-800 text-center text-7xl px-[1.3rem]">4</div>}
            onChange={() => setTotalRP(4)}
          />
          
        </div>
        <div className="flex justify-around">
          <button
            onClick={handleOverModel}
            className="bg-green-500 mt-5 p-3 rounded-lg hover:bg-green-400 transition-all duration-200 ease-in-out"
          >
            Submit
          </button>
          <button
            onClick={() => setGameOverModel(false)}
            className="bg-red-500 mt-5 p-3 rounded-lg hover:bg-red-400 transition-all duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </ModalRel>
    </>
  );
}

const RadioButton = ({ label, value, onChange, Icon }) => {
  return (
    <label className="flex flex-col justify-start align-center cursor-pointer border-2 border-gray-500 rounded-lg p-2">
      <input type="radio" checked={value} onChange={onChange} />
      <div className="text-center">{label}</div>
      <div className="w-auto h-auto">
        {label === "Got In" && <img src="got in.svg" />}
        {label === "Bounce Out" && <img src="bounce out.svg" />}
        {label === "Miss Close" && <img src="miss close.svg" />}
        {label === "Miss Far" && <img src="miss far.svg" />}
        {Icon && <span className="select-none"><Icon /></span>}
      </div>
    </label>
  );
};
