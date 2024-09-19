import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../screens/Splashs/Splash';
import Login from '../../screens/login';
import Home from '../../screens/Home/Home';
import adminLogin from '../../screens/adminLogin';
import teacherList from '../../screens/teacherlList';
import addTeacher from '../../screens/addTeacher';
import editTeacher from '../../screens/editTeacher';
import studentList from '../../screens/studentList';
import addStudent from '../../screens/addStudent';
import editStudent from '../../screens/editStudent';
import studentProfile from '../../screens/studentProfile';
import viewAnnouncement from '../../screens/viewAnnouncement';
import ContactUs from '../../screens/contectUs/ContactUs';
import veiwResult from '../../screens/veiwResult/veiwResult';
import veiwAttendance from '../../screens/veiwAttendance/veiwAttendance';
import Attendance from '../../screens/TeacherFlow/Attendance/Attendance';
// import Result from '../../screens/TeacherFlow/Result/Result';
import Teacherprofile from '../../screens/TeacherFlow/Teacherprofile/Teacherprofile';
// import teacherAttendance from '../../screens/teacherAttendance/teacherAttendance';
import Teacherhome from '../../screens/TeacherFlow/Teacherhome/Teacherhome';
import addAttendance from '../../screens/TeacherFlow/addAttendance/addAttendance';
import Result from '../../screens/TeacherFlow/Result/Result';
import AddAnnouncement from '../../screens/AdminFlow/AddAnnouncement';
import AdminAnnouncement from '../../screens/AdminFlow/AdminAnnouncement';
import Classdetail from '../../screens/classDetail';
import Classes from '../../screens/classes';
import ShowClasses from '../../screens/showClasses/ShowClasses';
import resultView from '../../screens/TeacherFlow/resultView/resultView';
// import index from '../../screens/addTeacher/loginTest';

const Stack = createNativeStackNavigator();

const mainStack = props => {
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="adminLogin" component={adminLogin} />
      <Stack.Screen name="teacherList" component={teacherList} />
      <Stack.Screen name="addTeacher" component={addTeacher} />
      <Stack.Screen name="editTeacher" component={editTeacher} />
      <Stack.Screen name="studentList" component={studentList} />
      <Stack.Screen name="addStudent" component={addStudent} />
      <Stack.Screen name="editStudent" component={editStudent} />
      <Stack.Screen name="studentProfile" component={studentProfile} />
      <Stack.Screen name="viewAnnouncement" component={viewAnnouncement} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="veiwResult" component={veiwResult} />
      <Stack.Screen name="veiwAttendance" component={veiwAttendance} />
      <Stack.Screen name="Attendance" component={Attendance} />
      {/* <Stack.Screen name="Result" component={Result} /> */}
      <Stack.Screen name="ReasuTeacherprofilel" component={Teacherprofile} />
      {/* <Stack.Screen name="teacherAttendance" component={teacherAttendance} /> */}
      <Stack.Screen name="Teacherhome" component={Teacherhome} />
      <Stack.Screen name="addAttendance" component={addAttendance} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="AddAnnouncement" component={AddAnnouncement} />
      <Stack.Screen name="AdminAnnouncement" component={AdminAnnouncement} />
      {/* <Stack.Screen name="addAttendance" component={addAttendance} /> */}
      <Stack.Screen name="Classdetail" component={Classdetail} />
      <Stack.Screen name="Classes" component={Classes} />
      <Stack.Screen name="ShowClasses" component={ShowClasses} />
      <Stack.Screen name="resultView" component={resultView} />
      {/* <Stack.Screen name="index" component={index} /> */}

    </Stack.Navigator>
  );
};

export default mainStack;