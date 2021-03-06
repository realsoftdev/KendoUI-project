var app = app || {};

(function () {

    app.listOfSectionsByUser = new kendo.data.DataSource({
        pageSize: 50,
        transport: {
            read: {
                url: function () {
					console.log(" read listOfSectionsByUser : " + WS_BASE_URL + "user/" + getUserInformationBase64().userId + "/sections" );
                    return WS_BASE_URL + "user/" + getUserInformationBase64().userId + "/sections";
                },
                beforeSend: app.setRequestHeader
            },
            update: {
                url: function (e) {
                    return WS_BASE_URL + 'deliverablesection/' + e.id
                },
                type: 'PATCH',
                contentType: "application/json",
                beforeSend: app.setRequestHeader
            },
            create: {
                url: function () {
                    return WS_BASE_URL + 'deliverablesection'
                },
                type: 'POST',
                contentType: "application/json",
                beforeSend: app.setRequestHeader
            },
            destroy: {
                url: function (e) {
                    return WS_BASE_URL + 'deliverablesection/' + e.id

                },
                type: 'DELETE',
                beforeSend: app.setRequestHeader
            },
            parameterMap: function (data, operation) {

                if (operation === "create") {

                    var model = {
                        rank: data.rank,
                        organisation: WS_BASE_URL + 'organization/' + app.user.organizationId,
                        project: WS_BASE_URL + "project/" + app.project.id,
                        deliverable: WS_BASE_URL + "odeliverable/" + app.selectedDeliverable.id,
                        section: WS_BASE_URL + "section/" + data.sectionId
                    };

                    return kendo.stringify(model);
                }

                if (operation === 'update') {

                    var model = {
                        id: data.id,
                        rank: data.rank,
                    };

                    return kendo.stringify(model);
                }

                if (operation === 'destroy') {
                    return kendo.stringify(model);
                }


                return data;
            }
        },
        schema: {
            parse: function (data) {

                if (data._embedded) {
                    return data._embedded.section;
                }

                app.updatedObject = data;
                return data;
            },
            model: {
                id: 'id'
            }
        },
        sort: { field: "rank", dir: "asc" }
    });


})()