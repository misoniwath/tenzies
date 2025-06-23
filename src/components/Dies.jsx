export default function Dies(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button 
    style={styles} 
    onClick={props.hold}
    aria-pressed={props.isHeld}
    aria-label={`Die showing ${props.value}, ${props.isHeld ? 'held' : 'not held'}`}
    
    >
      {props.value}
    </button>
  );
}
