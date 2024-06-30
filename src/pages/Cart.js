import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  // 아래에 state는 모든 state가 들어가 있다.

  let a = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  console.log(a.user);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>제품</th>
            <th>재원</th>
            <th>여러가지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
