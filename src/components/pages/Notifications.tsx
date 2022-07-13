import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonLabel,
  IonLoading,
} from "@ionic/react";
import { trpc, inferQueryOutput } from "../../utils/trpc";

import { close } from "ionicons/icons";

type NotificationOutput = inferQueryOutput<"notification.all">[0];

const NotificationItem = (props: { notification: NotificationOutput }) => (
  <IonItem>
    <IonLabel>{props.notification.title}</IonLabel>
    <IonNote slot="end">{props.notification.createdAt.toString()}</IonNote>
    <IonButton slot="end" fill="clear" color="dark">
      <IonIcon icon={close} />
    </IonButton>
  </IonItem>
);

const Notifications = (props: { open: boolean; onDidDismiss: any }) => {
  const notifications = trpc.useQuery(["notification.all"]);

  return (
    <IonModal isOpen={props.open} onDidDismiss={props.onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            color="dark"
            onClick={props.onDidDismiss}
          >
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {!notifications.data ? (
            <IonLoading isOpen={true}></IonLoading>
          ) : (
            notifications.data.map((notification, i) => (
              <NotificationItem notification={notification} key={i} />
            ))
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
