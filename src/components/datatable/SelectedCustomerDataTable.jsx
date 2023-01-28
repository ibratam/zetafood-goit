import "./datatable.scss";
import { React, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const SelectedCustomerDataTable = ({ todayDateSelected }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [isLoading, setIsLoading] = useState(true);
  const [valuesForSelectedDay,setValuesForSelectedDay] = useState([]);

  const handleChange = (e, index, key) => {
    const newData = [...valuesForSelectedDay];
    newData[index][key] = e.target.innerText;
};

const handleSelect = (e, index, key) => {
    const newData = [...valuesForSelectedDay];
    newData[index][key] = e.target.value;
};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ valuesForSelectedDay });
  };

  useEffect(()=>{
    getSelectedDayData() ;   
  },[])
  const getSelectedDayData= async()=>{
  try {
    const q = query(collection(db, "visitInformation"), where("dateOfVisit", "==",todayDateSelected),where("userId", "==",user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setValuesForSelectedDay(doc.data().listOfCustomers);
    });
    setIsLoading(false);
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <>
      {isLoading ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          mt={10}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="buttonspace">
            <input type="submit" className="updateButton" value={"حفظ"} />
          </div>
          <Table>
            <thead>
              <tr>
                <th className="tr">اسم الزبون </th>
                <th className="tr">معدل الهدف الشهري</th>
                <th className="tr">الزيارة المندوب</th>
                <th className="tr">الهدف من الزيارة</th>
                <th className="tr">ملاحظات المندوب</th>
              </tr>
            </thead>
            {valuesForSelectedDay.map((item, index) => (
              <tbody className="TableCell">
                <tr key={index}>
                  <td>
                    <TextField
                      disabled
                      fullWidth
                      name="customerName"
                      variant="filled"
                      value={item.customerName}
                      onInput={(e) => handleChange(e, index, "customerName")}
                    />
                  </td>
                  <td>
                    <Typography variant="filled">{item.saleTarget}</Typography>
                  </td>
                  <td>
                    <Select
                      variant="filled"
                      value={item.customerVisit}
                      name="customerVisit"
                      onChange={(e) => handleSelect(e, index, "customerVisit")}
                      style={{ width: "100%" }}
                    >
                      <MenuItem value={"موجود"}>موجود</MenuItem>
                      <MenuItem value={"غير موجود"}>غير موجود</MenuItem>
                    </Select>
                  </td>
                  <td>
                    <Select
                      variant="filled"
                      value={item.visitGoal}
                      name="visitGoal"
                      onChange={(e) => handleSelect(e, index, "visitGoal")}
                      style={{ width: "100%" }}
                    >
                      <MenuItem value={"بيع"}>بيع</MenuItem>
                      <MenuItem value={"تحصيل"}>تحصيل</MenuItem>
                    </Select>
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="filled"
                      multiline
                      maxRows={4}
                      name="note"
                      value={item.note}
                      onChange={(e) => handleSelect(e, index, "note")}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </form>
      )}
    </>
  );
};

export default SelectedCustomerDataTable;
