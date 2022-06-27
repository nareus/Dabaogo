import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import TopBarHome from '../../components/molecules/TopBarHome';
import {connect} from 'react-redux';
import {BACKGROUND_COLOR} from '../../styles/colors';
import {bindActionCreators} from 'redux';
import BuyerHomeScreen from '../../components/organisms/BuyerHomeScreen';
import TransporterHomeScreen from '../../components/organisms/TransporterHomeScreen';
import {userLogin} from '../../redux/action/UserActions';
import axios from 'axios';
import {BACKEND_URL} from '../../utils/links';

const HomeScreen = props => {
  const [toggleState, setToggleState] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const id = props.route.params.id;
      const response = await axios.get(`${BACKEND_URL}/users?userId=${id}}`);
      props.userLogin(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: BACKGROUND_COLOR, flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopBarHome
            selectionState={props.home}
            // onLeftPress={() => props.toggleHomeState(true)}
            // onRightPress={() => props.toggleHomeState(false)}
            onPressProfile={() => props.navigation.navigate('Settings')}
            onLeftPress={() => setToggleState(false)}
            onRightPress={() => setToggleState(true)}
          />
          {
            toggleState ? (
              <BuyerHomeScreen
                navigate={() => props.navigation.navigate('Order')}
              />
            ) : (
              <TransporterHomeScreen
                navigate={() => props.navigation.navigate('Transporter Status')}
              />
            )
            // <TransporterHomeScreen />
            // <BuyerHomeScreen />
          }
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
