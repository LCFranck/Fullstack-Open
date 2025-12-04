import type { Entry } from '../types';

interface Props {
  entries: Entry[];
}

const List = ({ entries }: Props) => {
  return (
    <ul>
      {entries.map(entry =>
        <p key={entry.id}>Date: {entry.date} <br />
          Weather: {entry.weather} <br />
          Visibility: {entry.visibility} <br />
          Comment: {entry.comment} <br />
        </p>  
      )}
    </ul>
  );
};

export default List;
