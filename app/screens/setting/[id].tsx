import React from 'react';
import { useRoute } from "@react-navigation/native";
import UserEditForm from "@/components/features/setting/account/UserEditForm";
import MainArea from "@/components/layout/MainArea";
import BaseView from "@/components/layout/DisplayView";
import DetailHeader from "@/components/common/header/DetailHeader";
import Error from "@/components/common/status/ErrorAlert";

export default function SettingDetailScreen() {
    const route = useRoute();
    const params = route.params as { id?: unknown } | undefined;
    const id = typeof params?.id === "string" ? params.id : null;

    // id が変更されたときだけコンポーネントを再計算する
    const renderPage = React.useMemo(() => {
        if (id === "account-setting") {
            return <UserEditForm />;
        } else {
            return null; // 不要なフラグメントの代わりに null を返す
        }
    }, [id]);

    if (!id) {
        return <Error />;
    }

    return (
        <BaseView header={<DetailHeader />}>
            <MainArea>
                {renderPage} {/* 直接変数を使用 */}
            </MainArea>
        </BaseView>
    );
}
