import React from 'react';
import PropTypes from 'prop-types';
import icons from './../../../../../resources/icons';
import {Link} from 'react-router-dom';

const CategoryTable = ({data, onClick}) => {
    return (
        <table className="w-3/5 my-5 min-w-max table-auto text-right">
        {data.map((item) =>
            (
                    <tbody key={item._id}>
                        <tr>
                            <td className="text-left">{item.name}</td>
                            <td onClick={()=>onClick(item.slug)}>{icons['delete']}</td>
                            <Link to={`/admin/dashboard/${item.slug}`}>
                                <td>{icons['edit']}</td>
                            </Link>
                        </tr>
                    </tbody>
            ))}
        </table>
    )
};

CategoryTable.propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func,
}

export default React.memo(CategoryTable);