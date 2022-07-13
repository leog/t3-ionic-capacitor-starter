import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import { trpc, inferQueryOutput } from "../../utils/trpc";

type ListOutput = inferQueryOutput<"list.all">[0];

const ListItems = (props: { list: ListOutput }) => {
  return (
    <IonList>
      {(props.list?.items || []).map((item, key) => (
        <ListItemEntry item={item} key={key} />
      ))}
    </IonList>
  );
};

const ListItemEntry = ({
  item,
}: {
  item: ListOutput["items"][0] & { done?: boolean };
}) => (
  <IonItem onClick={() => (item.done = !item.done)}>
    <IonLabel>{item.name}</IonLabel>
    <IonCheckbox checked={item.done || false} slot="end" />
  </IonItem>
);

const ListDetail = ({ match }: { match: { params: { listId: string } } }) => {
  const {
    params: { listId },
  } = match;
  const list = trpc.useQuery(["list.byId", { id: listId }]);

  return !list.data ? (
    <IonLoading isOpen={true}></IonLoading>
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/lists" />
          </IonButtons>
          <IonTitle>{list.data.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{list.data.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ListItems list={list.data} />
      </IonContent>
    </IonPage>
  );
};

export default ListDetail;
