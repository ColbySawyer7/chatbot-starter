import '../index.css';

export default function Instructions() {
    return (
      <div className='instructions'>
        <h1 className='instructions-header'> Getting Started</h1>
        <p className='instructions-text'>Start chatting with Crag by typing your question in the text field and clicking "Chat" or pressing Enter.</p>
        <p className='instructions-text'>Crag remembers your conversation within this session for seamless follow-ups, though chats are not saved afterwards for your privacy.</p>
        <p className='instructions-text'>Climb on!</p>
      </div>
    );
  }