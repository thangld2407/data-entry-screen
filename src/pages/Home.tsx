import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

export function isEmptyorWhiteSpace(value: string) {
  const re = /^\s*$/;
  return re.test(value);
}

export function isNumber(value: string) {
  const re = /^\d+$/;
  return re.test(value);
}

export function validateDate(value: string) {
  const re = /^\d{4}[\/.]\d{1,2}[\/.]\d{1,2}$/;
  return re.test(value);
}

function convertDate(date: string) {
  if (!date) {
    return '';
  }

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1);
  const day = newDate.getDate();


  return formatDateYearMonthDay(year, month, day);
};

function formatDateYearMonthDay(year: number, month: number, date: number) {
  if (!year && !month && !date) {
    return '';
  }

  return `${year}/${month}/${date}`;
};

function validatFormApartment(formApartment: any) {
  const listHouse = ['Flat', 'House', 'Bungalow'];
  const listBedrooms = ['Studio', 'One', 'Two'];
  const listFurnitures = ['Furnished', 'Unfurnished', 'PartFunished'];

  let isValidated = [];

  for (const index in formApartment) {
    if (Object.prototype.hasOwnProperty.call(formApartment, index)) {
      const el = formApartment[index];
      switch (index) {
        case 'rentPrice': {
          if (!isNumber(el)) {
            isValidated.push('You need to enter monthly rent price');
          }
          break;
        }
        case 'nameReporter': {
          if (isEmptyorWhiteSpace(el)) {
            isValidated.push('Name reporter is not empty ');
          }
          break;
        }
        case 'dateTime': {
          if (!validateDate(el)) {
            isValidated.push('Please enter date ')
          }
          break;
        }
        case 'notes': {
          // if(validateEmptyOrWhiteSpace(el)){
          //   isValidated.push('Notes');
          // } 
          break;
        }
        case 'houses': {
          if (!listHouse.includes(el)) {
            isValidated.push('Type of properties is not recognize');
          }
          break;
        }
        case 'bedrooms': {
          if (!listBedrooms.includes(el)) {
            isValidated.push('Type of bedrooms is not recognize');
          }
          break;
        }
        case 'furnitures': {
          if (!listFurnitures.includes(el)) {
            isValidated.push('Type of furnitures is not recognize');
          }
          break;
        }
        // default:{
        //   isValidate.push(false);
        // }
      }
    }
  }
  return isValidated;
}

function errorMessage(err: any) {
  const listError = err.join('<br>');

  return `${listError}`;
}


const Home: React.FC = () => {

  const [rentPrice, setRentPrice] = useState('');
  const [nameReporter, setNameReporter] = useState('');
  const [notes, setNotes] = useState('');
  const [houses, setHouse] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [furnitures, setFurnitures] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [colorMessage, setColorMessage] = useState('');

  const handleSubmit = () => {
    const formApartment = {
      houses,
      bedrooms,
      dateTime: convertDate(dateTime),
      furnitures,
      notes,
      nameReporter,
      rentPrice
    }
    const isValidate: any = validatFormApartment(formApartment);
    if (isValidate.length === 0) {
      setMessage('You are successfully to create a new room');
      setShowToast(true);
      setColorMessage('success');

      setTimeout(() => {
        setShowToast(false);
      }, 3000)
    } else {
      setMessage(errorMessage(isValidate));
      setShowToast(true);
      setColorMessage('warning');

      setTimeout(() => {
        setShowToast(false);
      }, 3000)
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-header">
          <IonTitle>Form Validate </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Select House</IonLabel>
            <IonSelect
              value={houses}
              onIonChange={e => setHouse(e.detail.value)}
            >
              <IonSelectOption value="Flat">Flat</IonSelectOption>

              <IonSelectOption value="House">House</IonSelectOption>

              <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>

            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Select Bedrooms</IonLabel>
            <IonSelect
              value={bedrooms}
              onIonChange={e => setBedrooms(e.detail.value)}
            >
              <IonSelectOption value="Studio">Studio</IonSelectOption>

              <IonSelectOption value="One">One</IonSelectOption>

              <IonSelectOption value="Two">Two</IonSelectOption>

            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Select Date </IonLabel>
            <IonDatetime displayFormat="DD/MMM/YYYY" onIonChange={e => setDateTime(e.detail.value!)}></IonDatetime>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Select Furnitures</IonLabel>
            <IonSelect
              value={furnitures}
              onIonChange={e => setFurnitures(e.detail.value)}
            >
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>

              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>

              <IonSelectOption value="PartFunished">Part Furnished</IonSelectOption>

            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Notes</IonLabel>
            <IonInput placeholder="Notes" onIonChange={e => setNotes(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Reporter</IonLabel>
            <IonInput placeholder="Reporter" type="text" onIonChange={e => setNameReporter(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" >Rent Price</IonLabel>
            <IonInput placeholder="Rent Price" type="number" onIonChange={e => setRentPrice(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={handleSubmit} color="primary" expand="block" fill="solid">
            Submit
          </IonButton>
        </div>
      </IonContent>
      <IonToast
        message={message}
        isOpen={showToast}
        position="bottom"
        color={colorMessage}
      />
    </IonPage>
  );
};

export default Home;
