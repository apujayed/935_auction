import moment from "moment";

function Card({data}) {
const {username,updated,created} = data;
    return (
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{moment(created).fromNow()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{moment(updated).fromNow()}</td>
            </tr>
    )
}

export default Card;
