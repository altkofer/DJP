(() => {
  "use strict";

  const STORAGE_KEY = "berufsschule-jahresplanung-pegnitz-im-v3";
  const WEEK_SEQUENCE = [
    ...Array.from({ length: 20 }, (_, i) => i + 34),
    ...Array.from({ length: 31 }, (_, i) => i + 1)
  ];
  const DAYS = [
    ["mo", "Montag"],
    ["di", "Dienstag"],
    ["mi", "Mittwoch"],
    ["do", "Donnerstag"],
    ["fr", "Freitag"]
  ];
  const FIELD_COLORS = ["#3a75a3", "#d39827", "#3d8761", "#b95b50", "#765ea4", "#287f83"];
  const CLASS_COLORS = ["#3a75a3", "#d39827", "#3d8761", "#b95b50", "#765ea4"];

  const seed = {
    version: 3,
    schoolYear: "2026/27",
    selectedClassId: "class-im10a",
    fields: [
      { id: "field-lf1", code: "LF 1", area: "Fertigungstechnik", name: "Fertigen von Bauelementen mit handgeführten Werkzeugen", targetHours: 84, practicalHours: 24 },
      { id: "field-lf2", code: "LF 2", area: "Fertigungstechnik", name: "Fertigen von Bauelementen mit Maschinen", targetHours: 84, practicalHours: 24 },
      { id: "field-lf3", code: "LF 3", area: "Bauelemente", name: "Herstellen von einfachen Baugruppen", targetHours: 84, practicalHours: 24 },
      { id: "field-lf4", code: "LF 4", area: "Instandhaltung", name: "Warten technischer Systeme", targetHours: 84, practicalHours: 24 },
      { id: "field-lf5", code: "LF 5", area: "Fertigungstechnik", name: "Fertigen von Einzelteilen mit Werkzeugmaschinen", targetHours: 72, practicalHours: 24 },
      { id: "field-lf6", code: "LF 6", area: "Automatisierungstechnik", name: "Installieren und Inbetriebnehmen steuerungstechnischer Systeme", targetHours: 60, practicalHours: 24 },
      { id: "field-lf7", code: "LF 7", area: "Bauelemente", name: "Montieren von technischen Teilsystemen", targetHours: 48, practicalHours: 12 },
      { id: "field-lf8", code: "LF 8", area: "Fertigungstechnik", name: "Fertigen auf numerisch gesteuerten Werkzeugmaschinen", targetHours: 60, practicalHours: 12 },
      { id: "field-lf9", code: "LF 9", area: "Instandhaltung", name: "Instandsetzen von technischen Systemen", targetHours: 36, practicalHours: 12 },
      { id: "field-lf10", code: "LF 10", area: "Bauelemente", name: "Herstellen und Inbetriebnehmen von technischen Systemen", targetHours: 84, practicalHours: 28 },
      { id: "field-lf11", code: "LF 11", area: "Fertigungstechnik", name: "Überwachen der Produkt- und Prozessqualität", targetHours: 60, practicalHours: 12 },
      { id: "field-lf12", code: "LF 12", area: "Instandhaltung", name: "Instandhalten von technischen Systemen", targetHours: 70, practicalHours: 14 },
      { id: "field-lf13", code: "LF 13", area: "Automatisierungstechnik", name: "Sicherstellen der Betriebsfähigkeit automatisierter Systeme", targetHours: 84, practicalHours: 28 },
      { id: "field-lf14", code: "LF 14", area: "Fertigungstechnik", name: "Planen und Realisieren technischer Systeme", targetHours: 84, practicalHours: 28 },
      { id: "field-lf15", code: "LF 15", area: "Fertigungstechnik", name: "Optimieren von technischen Systemen", targetHours: 70, practicalHours: 14 }
    ],
    classes: [
      {
        id: "class-im10a",
        name: "IM 10A",
        profile: "Industriemechaniker/-in · Berufsschule Pegnitz · 1. Ausbildungsjahr",
        type: "day",
        color: "#3a75a3",
        days: [
          { day: "mo", interval: 1 },
          { day: "di", interval: 2 }
        ],
        blockRanges: "",
        exceptions: [34, 35, 36, 37, 45, 52, 53, 1, 6, 12, 13, 20, 21, 31],
        fieldIds: ["field-lf1", "field-lf2", "field-lf3", "field-lf4"],
        modules: [
          { id: "im10-lf1-1", title: "Werkstattauftrag Anschlagwinkel planen", fieldId: "field-lf1", color: "blue", startWeek: 38, duration: 7, hours: 24, goals: "Technische Zeichnungen auswerten, Werkstoffe auswählen und einen sicheren Arbeitsplan erstellen.", content: "Teilzeichnung, Skizze, Maßstab, Allgemeintoleranzen, Werkstoffauswahl, Arbeitsplan und Arbeitsschutz", assessment: "Arbeitsplan mit Zeichnungsanalyse" },
          { id: "im10-lf1-2", title: "Anschlagwinkel manuell fertigen", fieldId: "field-lf1", color: "blue", startWeek: 46, duration: 7, hours: 32, goals: "Handgeführte Werkzeuge fachgerecht einsetzen und Fertigungsschritte selbstständig durchführen.", content: "Anreißen, Körnen, Sägen, Feilen, Bohren, Gewindeherstellung, Biegen und ergonomisches Arbeiten", assessment: "Praktische Arbeitsprobe" },
          { id: "im10-lf1-3", title: "Bauteil prüfen und Auftrag auswerten", fieldId: "field-lf1", color: "blue", startWeek: 2, duration: 7, hours: 28, goals: "Prüfmittel auswählen, Messwerte dokumentieren sowie Qualität und Fertigungskosten bewerten.", content: "Messschieber, Winkelprüfung, Prüfprotokoll, Materialbedarf, Fertigungskosten und Präsentation", assessment: "Prüfprotokoll und Fachgespräch" },
          { id: "im10-lf2-1", title: "Bohrplatte maschinell fertigen", fieldId: "field-lf2", color: "amber", startWeek: 38, duration: 6, hours: 24, goals: "Maschinenaufbau, Werkzeuge und Fertigungsparameter für einen Bohrungsauftrag auswählen.", content: "Säulenbohrmaschine, Bohren, Senken, Reiben, Drehzahl, Vorschub und Arbeitssicherheit", assessment: "Fertigungsplan mit Berechnungen" },
          { id: "im10-lf2-2", title: "Drehteil auftragsbezogen herstellen", fieldId: "field-lf2", color: "amber", startWeek: 44, duration: 7, hours: 32, goals: "Drehoperationen planen, Schnittdaten bestimmen und Maße prozessbegleitend prüfen.", content: "Drehen, Werkzeugauswahl, Schnittgeschwindigkeit, Drehzahl, Vorschub, Oberfläche und Prüfen", assessment: "Technologiedatenblatt und Arbeitsprobe" },
          { id: "im10-lf2-3", title: "Fräsauftrag vergleichen und optimieren", fieldId: "field-lf2", color: "amber", startWeek: 7, duration: 7, hours: 28, goals: "Fräsverfahren auswählen, einen Prozess dokumentieren und wirtschaftliche Alternativen beurteilen.", content: "Fräsen, Spannmittel, Arbeitsfolge, Maschinenkosten, Materialverbrauch und Prozessoptimierung", assessment: "Fertigungsdokumentation" },
          { id: "im10-lf3-1", title: "Spannvorrichtung analysieren", fieldId: "field-lf3", color: "green", startWeek: 38, duration: 7, hours: 24, goals: "Gesamtzeichnungen lesen, Funktionen erklären und eine vollständige Stückliste ableiten.", content: "Gesamtzeichnung, Anordnungsplan, Funktionsbeschreibung, Stückliste und Normteile", assessment: "Zeichnungsanalyse und Stückliste" },
          { id: "im10-lf3-2", title: "Spannvorrichtung montieren", fieldId: "field-lf3", color: "green", startWeek: 46, duration: 8, hours: 36, goals: "Fügeverfahren auswählen und eine einfache Baugruppe im Team sicher montieren.", content: "Schrauben, Stifte, Nieten, Kleben, Montageplan, Werkzeugauswahl, Drehmoment und Kennzeichnung", assessment: "Montageauftrag mit Teamdokumentation" },
          { id: "im10-lf3-3", title: "Baugruppe prüfen und übergeben", fieldId: "field-lf3", color: "green", startWeek: 7, duration: 6, hours: 24, goals: "Funktionsprüfungen planen, Qualitätsmängel beseitigen und die Baugruppe dokumentiert übergeben.", content: "Prüfplan, Prüfprotokoll, Funktionsprüfung, Fehlersuche und Ablaufoptimierung", assessment: "Funktionsprüfung und Übergabegespräch" },
          { id: "im10-lf4-1", title: "Wartung einer Tischbohrmaschine planen", fieldId: "field-lf4", color: "red", startWeek: 38, duration: 6, hours: 24, goals: "Wartungsbedarf aus technischen Unterlagen ableiten und einen sicheren Wartungsablauf planen.", content: "Grundbegriffe der Instandhaltung, Wartungspläne, Betriebsanleitungen und Arbeitsschutz", assessment: "Wartungsplan und Sicherheitsunterweisung" },
          { id: "im10-lf4-2", title: "Verschleiß und Betriebsstoffe beurteilen", fieldId: "field-lf4", color: "red", startWeek: 44, duration: 7, hours: 32, goals: "Verschleißbilder analysieren sowie Schmier-, Kühl- und Korrosionsschutzmaßnahmen begründen.", content: "Verschleiß, Schmierstoffe, Kühlschmierstoffe, Korrosion, Kennzeichnung und Entsorgung", assessment: "Schadensanalyse und Maßnahmenplan" },
          { id: "im10-lf4-3", title: "Wartung durchführen und dokumentieren", fieldId: "field-lf4", color: "red", startWeek: 2, duration: 7, hours: 28, goals: "Wartungsarbeiten durchführen, elektrische Gefahren berücksichtigen und die Funktion bewerten.", content: "Elektrische Grundgrößen, Schutzmaßnahmen, Wartungsdurchführung, Funktionsprüfung und Wartungsbericht", assessment: "Praktische Wartung mit Bericht" }
        ]
      },
      {
        id: "class-im11a",
        name: "IM 11A",
        profile: "Industriemechaniker/-in · Berufsschule Pegnitz · 2. Ausbildungsjahr",
        type: "day",
        color: "#d39827",
        days: [
          { day: "mi", interval: 1 },
          { day: "di", interval: 2 }
        ],
        blockRanges: "",
        exceptions: [34, 35, 36, 37, 45, 52, 53, 1, 6, 12, 13, 20, 21, 31],
        fieldIds: ["field-lf5", "field-lf6", "field-lf7", "field-lf8", "field-lf9", "field-lf11"],
        modules: [
          { id: "im11-lf5-1", title: "Pumpenwelle konventionell planen", fieldId: "field-lf5", color: "blue", startWeek: 38, duration: 5, hours: 24, goals: "Zeichnung und Auftrag analysieren, Verfahren auswählen und einen vollständigen Arbeitsplan entwickeln.", content: "Technische Informationsquellen, Werkstoffnormung, Drehen, Fräsen, Spannmittel und Bearbeitungsparameter", assessment: "Arbeitsplan mit Verfahrensbegründung" },
          { id: "im11-lf5-2", title: "Einzelteil fertigen und prüfen", fieldId: "field-lf5", color: "blue", startWeek: 46, duration: 6, hours: 24, goals: "Eine Werkzeugmaschine einrichten, das Werkstück fertigen und variable Prüfmerkmale erfassen.", content: "Schneidstoffe, Kühlschmierstoffe, Hauptnutzungszeit, Prüfmittel und Prüfprotokoll", assessment: "Arbeitsprobe mit Prüfprotokoll" },
          { id: "im11-lf5-3", title: "Fertigungsprozess wirtschaftlich bewerten", fieldId: "field-lf5", color: "blue", startWeek: 8, duration: 6, hours: 24, goals: "Qualität, Kosten und Alternativen eines spanenden Fertigungsprozesses vergleichen.", content: "Fertigungszeit, Maschinenkosten, Oberflächengüte, Formabweichung und Prozessalternative", assessment: "Kalkulation und Fachpräsentation" },
          { id: "im11-lf6-1", title: "Pneumatische Spannvorrichtung projektieren", fieldId: "field-lf6", color: "red", startWeek: 38, duration: 5, hours: 20, goals: "Technologieschema und Schaltplan auswerten sowie Komponenten auftragsbezogen dimensionieren.", content: "Pneumatik, Versorgungseinheit, Ventile, Zylinder, Sensoren, Drücke, Kräfte und Volumenstrom", assessment: "Schaltungsentwurf mit Berechnungen" },
          { id: "im11-lf6-2", title: "Steuerung aufbauen und in Betrieb nehmen", fieldId: "field-lf6", color: "red", startWeek: 46, duration: 6, hours: 20, goals: "Eine steuerungstechnische Schaltung sicher aufbauen, prüfen und dokumentiert in Betrieb nehmen.", content: "Stromlaufplan, Betriebsarten, Anlagensicherheit, Aufbau, Inbetriebnahme und Funktionsprüfung", assessment: "Praktische Inbetriebnahme" },
          { id: "im11-lf6-3", title: "Steuerungsfehler systematisch beheben", fieldId: "field-lf6", color: "red", startWeek: 8, duration: 6, hours: 20, goals: "Fehlersuchstrategien anwenden, die Steuerung optimieren und Ergebnisse präsentieren.", content: "Fehlerbaum, Messstrategie, Simulation, Optimierung und technische Dokumentation", assessment: "Fehlersuche und Fachgespräch" },
          { id: "im11-lf7-1", title: "Lagerung einer Antriebswelle auslegen", fieldId: "field-lf7", color: "green", startWeek: 38, duration: 5, hours: 16, goals: "Funktion, Belastung und Montagebedingungen einer Wellenlagerung analysieren.", content: "Achsen, Wellen, Gleit- und Wälzlager, Reibung, Wärmedehnung und Festigkeitskenngrößen", assessment: "Auslegungsrechnung und Bauteilauswahl" },
          { id: "im11-lf7-2", title: "Getriebeteilsystem montieren", fieldId: "field-lf7", color: "green", startWeek: 46, duration: 6, hours: 16, goals: "Montageplan, Werkzeuge und Hilfsmittel festlegen und ein Teilsystem fachgerecht montieren.", content: "Welle-Nabe-Verbindungen, Passungen, Dichtungen, Führungen und digitale Montageunterlagen", assessment: "Montageauftrag und Prüfprotokoll" },
          { id: "im11-lf7-3", title: "Montageablauf prüfen und verbessern", fieldId: "field-lf7", color: "green", startWeek: 8, duration: 6, hours: 16, goals: "Funktionskontrollen auswerten und Montageabläufe wirtschaftlich optimieren.", content: "Passungssysteme, Flächenpressung, Funktionskontrolle, Visualisierung und Ablaufoptimierung", assessment: "Optimierungsvorschlag mit Präsentation" },
          { id: "im11-lf8-1", title: "CNC-Drehteil programmieren", fieldId: "field-lf8", color: "amber", startWeek: 38, duration: 5, hours: 20, goals: "Geometrie- und Technologiedaten ermitteln und ein strukturiertes CNC-Programm entwickeln.", content: "Koordinatensysteme, Bezugspunkte, Programmaufbau, Werkzeugplan und Einrichteblatt", assessment: "CNC-Programm mit Simulation" },
          { id: "im11-lf8-2", title: "CNC-Frästeil mit CAD/CAM fertigen", fieldId: "field-lf8", color: "amber", startWeek: 46, duration: 6, hours: 20, goals: "Eine CAD/CAM-Prozesskette planen, simulieren und an der Maschine sicher umsetzen.", content: "CAD-Modell, CAM-Strategie, Werkzeugkorrekturen, Einspannung, Simulation und Arbeitsschutz", assessment: "Fertigungsauftrag und Maschineneinrichtung" },
          { id: "im11-lf8-3", title: "CNC-Serie qualitätsgerecht optimieren", fieldId: "field-lf8", color: "amber", startWeek: 8, duration: 6, hours: 20, goals: "Prüfdaten einer Serie auswerten und Korrekturen für Qualität und Produktivität ableiten.", content: "Prüfplan, variable und attributive Merkmale, Werkzeugkorrektur, Oberfläche und Produktivität", assessment: "Prüfdatenauswertung und Prozessoptimierung" },
          { id: "im11-lf9-1", title: "Störung an einem Getriebe diagnostizieren", fieldId: "field-lf9", color: "red", startWeek: 38, duration: 5, hours: 12, goals: "Fehlerbilder eingrenzen und eine wirtschaftliche Instandsetzungsmaßnahme planen.", content: "Gesamtzeichnung, Schaltplan, Fehleranalyse, Verschleiß, Stillstandszeit und Ausfallkosten", assessment: "Diagnoseprotokoll" },
          { id: "im11-lf9-2", title: "Teilsystem demontieren und instand setzen", fieldId: "field-lf9", color: "red", startWeek: 46, duration: 6, hours: 12, goals: "Demontage und Ersatzteilbeschaffung planen sowie defekte Bauelemente fachgerecht ersetzen.", content: "Demontageplan, Ersatzteilliste, Hilfsstoffe, Schnittstellen, Entsorgung und Montage", assessment: "Instandsetzungsauftrag" },
          { id: "im11-lf9-3", title: "Funktion prüfen und Anlage abnehmen", fieldId: "field-lf9", color: "red", startWeek: 8, duration: 6, hours: 12, goals: "Das instand gesetzte System prüfen, dokumentieren und zur Abnahme vorbereiten.", content: "Funktionsprüfung, Inspektionsbericht, Abnahmeprotokoll, Arbeits- und Umweltschutz", assessment: "Abnahmegespräch und Bericht" },
          { id: "im11-lf11-1", title: "Messdaten einer Serie auswerten", fieldId: "field-lf11", color: "violet", startWeek: 38, duration: 5, hours: 20, goals: "Messdaten digital erfassen und statistische Kenngrößen fachgerecht berechnen.", content: "Mittelwert, Median, Spannweite, Standardabweichung, Histogramm und Normalverteilung", assessment: "Datenauswertung mit Tabellenkalkulation" },
          { id: "im11-lf11-2", title: "Maschinen- und Prozessfähigkeit beurteilen", fieldId: "field-lf11", color: "violet", startWeek: 46, duration: 6, hours: 20, goals: "Fähigkeitskennwerte bestimmen und systematische von zufälligen Einflüssen unterscheiden.", content: "Cm, Cmk, Cp, Cpk, Qualitätsnormen, Ursache-Wirkungs-Diagramm und Prüfplanung", assessment: "Fähigkeitsuntersuchung" },
          { id: "im11-lf11-3", title: "Prozess mit Regelkarte überwachen", fieldId: "field-lf11", color: "violet", startWeek: 8, duration: 6, hours: 20, goals: "Qualitätsregelkarten führen, Trends erkennen und wirksame Korrekturmaßnahmen ableiten.", content: "Statistische Prozessregelung, Regelkarten, CAQ-Daten, Musteranalyse und Kundenvorgaben", assessment: "Prozessbericht und Präsentation" }
        ]
      },
      {
        id: "class-im12a",
        name: "IM 12A",
        profile: "Industriemechaniker/-in · Berufsschule Pegnitz · Jahrgangsstufen 12/13",
        type: "day",
        color: "#3d8761",
        days: [{ day: "do", interval: 1 }],
        blockRanges: "",
        exceptions: [34, 35, 36, 37, 45, 52, 53, 1, 6, 12, 13, 20, 21, 31],
        fieldIds: ["field-lf10", "field-lf12", "field-lf13", "field-lf14", "field-lf15"],
        modules: [
          { id: "im12-lf10-1", title: "Montageauftrag für ein Antriebssystem klären", fieldId: "field-lf10", color: "green", startWeek: 38, duration: 6, hours: 28, goals: "Änderungsauftrag, Gesamtzeichnung und Funktionszusammenhänge analysieren und ein Pflichtenheft erstellen.", content: "Pflichtenheft, Getriebe, Kupplungen, Pumpen, elektrische Antriebe, Kennlinien und Sicherheit", assessment: "Auftragsanalyse und Pflichtenheft" },
          { id: "im12-lf10-2", title: "Technisches System herstellen und montieren", fieldId: "field-lf10", color: "green", startWeek: 2, duration: 7, hours: 28, goals: "Fertigungs- und Montageabläufe planen, Teilsysteme fügen und ergonomisch sicher arbeiten.", content: "Schweißen, Kleben, Montagehilfsmittel, Hebezeuge, Anschlagen von Lasten und Arbeitsplanung", assessment: "Projektauftrag mit Montagedokumentation" },
          { id: "im12-lf10-3", title: "System in Betrieb nehmen und übergeben", fieldId: "field-lf10", color: "green", startWeek: 14, duration: 8, hours: 28, goals: "Parameter einstellen, Funktionen prüfen und ein technisches System kundenorientiert übergeben.", content: "Inbetriebnahme, Parametrierung, Bedienungsanleitung, Übergabeprotokoll, IT- und Datenschutz", assessment: "Inbetriebnahme und Kundengespräch" },
          { id: "im12-lf12-1", title: "Instandhaltungsauftrag und Systemdaten analysieren", fieldId: "field-lf12", color: "red", startWeek: 38, duration: 6, hours: 24, goals: "Wartungsbedarf aus Betriebsdaten ableiten und eine zustandsorientierte Strategie planen.", content: "Betriebsdatenerfassung, vorbeugende und zustandsbedingte Instandhaltung, Condition Monitoring", assessment: "Instandhaltungskonzept" },
          { id: "im12-lf12-2", title: "Schadensursache diagnostizieren", fieldId: "field-lf12", color: "red", startWeek: 2, duration: 7, hours: 24, goals: "Fehlerprotokolle auswerten, Prüfverfahren auswählen und Schwachstellen systematisch bewerten.", content: "Schadensanalyse, Werkstoffprüfung, Wärmebehandlung, Paretoanalyse, Trendanalyse und Diagnose", assessment: "Diagnosebericht" },
          { id: "im12-lf12-3", title: "Instandsetzung kalkulieren und übergeben", fieldId: "field-lf12", color: "red", startWeek: 14, duration: 8, hours: 22, goals: "Maßnahmen kalkulieren, die Verfügbarkeit wiederherstellen und rechtssicher dokumentieren.", content: "Kostenvoranschlag, Ausfallzeiten, Instandhaltungskosten, Produkthaftung und Kundenübergabe", assessment: "Kostenvoranschlag und Übergabegespräch" },
          { id: "im12-lf13-1", title: "Automatisiertes Handhabungssystem analysieren", fieldId: "field-lf13", color: "violet", startWeek: 38, duration: 6, hours: 28, goals: "Informations-, Energie- und Stofffluss eines automatisierten Systems strukturiert darstellen.", content: "Elektropneumatik, Elektrohydraulik, Steuerung, Regelung, Sensorik, Schnittstellen und Sicherheit", assessment: "Systemanalyse und Funktionsplan" },
          { id: "im12-lf13-2", title: "SPS-Ablauf programmieren und testen", fieldId: "field-lf13", color: "violet", startWeek: 2, duration: 7, hours: 28, goals: "Einen Prozessablauf in einer SPS umsetzen, simulieren und sicher in Betrieb nehmen.", content: "Betriebsarten, Ablaufsprache, Funktionsbausteinsprache, Identifikationssysteme und Testplanung", assessment: "SPS-Programm mit Inbetriebnahme" },
          { id: "im12-lf13-3", title: "Automatisierungsstörung beheben und optimieren", fieldId: "field-lf13", color: "violet", startWeek: 14, duration: 8, hours: 28, goals: "Störungen systematisch eingrenzen, beseitigen und eine Prozessoptimierung dokumentieren.", content: "Fehlersuchstrategie, flexible Handhabungssysteme, Instandhaltungsvorschriften und Prozessoptimierung", assessment: "Störungsdiagnose und Optimierungsbericht" },
          { id: "im12-lf14-1", title: "Projektauftrag für eine Montagevorrichtung definieren", fieldId: "field-lf14", color: "blue", startWeek: 38, duration: 6, hours: 28, goals: "Projektauftrag auf Machbarkeit prüfen, Ziele festlegen und Anforderungen strukturiert dokumentieren.", content: "Lastenheft, Pflichtenheft, Zieldefinition, Machbarkeit, Risiken und Qualitätsvorgaben", assessment: "Projektauftrag und Meilensteinpräsentation" },
          { id: "im12-lf14-2", title: "Technisches Projekt planen und realisieren", fieldId: "field-lf14", color: "blue", startWeek: 2, duration: 7, hours: 28, goals: "Arbeitspakete, Ressourcen und Termine planen sowie den Projektfortschritt steuern.", content: "Projektstrukturplan, Terminplan, Ressourcen, Projektmanagement-Tools und Änderungsmanagement", assessment: "Projektmappe und Zwischenabnahme" },
          { id: "im12-lf14-3", title: "Projektergebnis bewerten und präsentieren", fieldId: "field-lf14", color: "blue", startWeek: 14, duration: 8, hours: 28, goals: "Ergebnisse technisch, ökologisch und wirtschaftlich bewerten und adressatengerecht präsentieren.", content: "Qualitätssicherung, Dokumentation, Evaluation, Wirtschaftlichkeit und Projektpräsentation", assessment: "Abschlusspräsentation mit Reflexion" },
          { id: "im12-lf15-1", title: "Optimierungspotenzial einer Produktionsanlage ermitteln", fieldId: "field-lf15", color: "amber", startWeek: 38, duration: 6, hours: 24, goals: "Einen stabilen Prozess hinsichtlich Ergonomie, Umweltwirkung, Qualität und Kosten untersuchen.", content: "Prozessaufnahme, Kennzahlen, Ergonomie, Gesundheits- und Umweltschutz sowie Wirtschaftlichkeit", assessment: "Prozessanalyse" },
          { id: "im12-lf15-2", title: "Verbesserungsvorschläge entwickeln und entscheiden", fieldId: "field-lf15", color: "amber", startWeek: 2, duration: 7, hours: 24, goals: "Verbesserungen im Team entwickeln, bewerten und eine Entscheidung moderieren.", content: "Ideenmanagement, neue Werk- und Hilfsstoffe, Nutzwertanalyse, Moderation und Nutzenabschätzung", assessment: "Entscheidungsvorlage und Moderation" },
          { id: "im12-lf15-3", title: "Optimierungsmaßnahme umsetzen und sichern", fieldId: "field-lf15", color: "amber", startWeek: 14, duration: 8, hours: 22, goals: "Eine ausgewählte Maßnahme planen, dokumentieren und ihren nachhaltigen Nutzen nachweisen.", content: "Arbeitsorganisation, Ressourcenplanung, Wissensmanagement, Wirksamkeitskontrolle und Dokumentation", assessment: "Optimierungsbericht mit Wirksamkeitsnachweis" }
        ]
      }
    ]
  };

  const clone = value => JSON.parse(JSON.stringify(value));

  let state = loadState();
  let undoStack = [];
  let redoStack = [];
  let toastTimer = null;
  let zoom = 74;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const id = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const activeClass = () => state.classes.find(item => item.id === state.selectedClassId) || state.classes[0];
  const fieldById = fieldId => state.fields.find(field => field.id === fieldId);
  const classFields = clazz => state.fields.filter(field => !Array.isArray(clazz?.fieldIds) || clazz.fieldIds.includes(field.id));
  const weekIndex = week => WEEK_SEQUENCE.indexOf(Number(week));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.classes) && Array.isArray(saved.fields)) return saved;
    } catch (error) {
      console.warn("Gespeicherte Planung konnte nicht geladen werden.", error);
    }
    return clone(seed);
  }

  function saveState() {
    const indicator = $("#saveState");
    indicator.classList.add("saving");
    indicator.lastChild.textContent = " Wird gespeichert";
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.setTimeout(() => {
      indicator.classList.remove("saving");
      indicator.lastChild.textContent = " Lokal gespeichert";
    }, 260);
  }

  function commit(change, message) {
    undoStack.push(clone(state));
    if (undoStack.length > 40) undoStack.shift();
    redoStack = [];
    change();
    saveState();
    render();
    if (message) showToast(message);
  }

  function restore(from, to) {
    if (!from.length) return;
    to.push(clone(state));
    state = from.pop();
    saveState();
    render();
  }

  function parseBlockRanges(text) {
    const result = new Set();
    String(text || "").split(",").map(part => part.trim()).filter(Boolean).forEach(part => {
      const match = part.match(/^(\d{1,2})(?:\s*-\s*(\d{1,2}))?$/);
      if (!match) return;
      const start = Number(match[1]);
      const end = Number(match[2] || match[1]);
      const startIndex = weekIndex(start);
      const endIndex = weekIndex(end);
      if (startIndex < 0 || endIndex < 0) return;
      if (startIndex <= endIndex) {
        for (let i = startIndex; i <= endIndex; i += 1) result.add(WEEK_SEQUENCE[i]);
      } else {
        for (let i = startIndex; i < WEEK_SEQUENCE.length; i += 1) result.add(WEEK_SEQUENCE[i]);
        for (let i = 0; i <= endIndex; i += 1) result.add(WEEK_SEQUENCE[i]);
      }
    });
    return result;
  }

  function weekStatus(clazz, week, index) {
    if ((clazz.exceptions || []).includes(week)) return "holiday";
    if (clazz.type === "block") return parseBlockRanges(clazz.blockRanges).has(week) ? "present" : "absent";
    return (clazz.days || []).some(pattern => pattern.interval === 1 || index % pattern.interval === 0) ? "present" : "absent";
  }

  function attendanceDays(clazz) {
    if (clazz.type === "block") {
      return WEEK_SEQUENCE.reduce((sum, week, index) => sum + (weekStatus(clazz, week, index) === "present" ? 5 : 0), 0);
    }
    return WEEK_SEQUENCE.reduce((sum, week, index) => {
      if ((clazz.exceptions || []).includes(week)) return sum;
      return sum + (clazz.days || []).filter(pattern => pattern.interval === 1 || index % pattern.interval === 0).length;
    }, 0);
  }

  function scheduleText(clazz) {
    if (clazz.type === "block") return clazz.blockRanges ? `Blockwochen: ${clazz.blockRanges}` : "Noch keine Blockwochen festgelegt";
    if (!clazz.days?.length) return "Noch keine Schultage festgelegt";
    return clazz.days.map(pattern => {
      const dayName = DAYS.find(([key]) => key === pattern.day)?.[1] || pattern.day;
      return `${dayName} · ${pattern.interval === 1 ? "wöchentlich" : "A-Woche"}`;
    }).join(" · ");
  }

  function render() {
    if (!state.classes.some(item => item.id === state.selectedClassId)) state.selectedClassId = state.classes[0]?.id;
    $("#schoolYear").value = state.schoolYear;
    renderClassList();
    renderClassHeader();
    renderTimeline();
    renderFields();
    renderOverview();
    $("#undoBtn").disabled = !undoStack.length;
    $("#redoBtn").disabled = !redoStack.length;
  }

  function renderClassList() {
    const list = $("#classList");
    list.innerHTML = "";
    state.classes.forEach(clazz => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `class-item${clazz.id === state.selectedClassId ? " active" : ""}`;
      button.style.setProperty("--class-color", clazz.color || CLASS_COLORS[0]);
      button.innerHTML = `
        <i class="class-color" aria-hidden="true"></i>
        <span><strong>${escapeHtml(clazz.name)}</strong><span>${clazz.type === "block" ? "Blockklasse" : "Tagesklasse"}</span></span>
        <i class="class-modules">${clazz.modules.length}</i>`;
      button.addEventListener("click", () => {
        state.selectedClassId = clazz.id;
        saveState();
        render();
      });
      list.append(button);
    });
    const moduleCount = state.classes.reduce((sum, clazz) => sum + clazz.modules.length, 0);
    $("#classCount").textContent = `${state.classes.length} ${state.classes.length === 1 ? "Klasse" : "Klassen"}`;
    $("#moduleCount").textContent = `${moduleCount} Bausteine`;
  }

  function renderClassHeader() {
    const clazz = activeClass();
    if (!clazz) return;
    const planned = clazz.modules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
    const target = classFields(clazz).reduce((sum, field) => sum + Number(field.targetHours || 0), 0);
    $("#activeClassName").textContent = clazz.name;
    $("#activeClassType").textContent = clazz.type === "block" ? "Blockklasse" : "Tagesklasse";
    $("#activeClassType").classList.toggle("block", clazz.type === "block");
    $("#activeClassSchedule").textContent = [clazz.profile, scheduleText(clazz)].filter(Boolean).join(" · ");
    $("#attendanceCount").textContent = attendanceDays(clazz);
    $("#plannedHours").textContent = planned;
    $("#coverageValue").textContent = `${target ? Math.round(planned / target * 100) : 0}%`;
  }

  function renderTimeline() {
    const clazz = activeClass();
    const timeline = $("#timeline");
    timeline.innerHTML = "";
    if (!clazz) return;
    const fields = classFields(clazz);

    const header = document.createElement("div");
    header.className = "timeline-header";
    const corner = document.createElement("div");
    corner.className = "corner-cell";
    corner.innerHTML = `<strong>Kalenderwochen</strong><span>${escapeHtml(state.schoolYear)} · ${WEEK_SEQUENCE.length} Wochen</span>`;
    header.append(corner);

    WEEK_SEQUENCE.forEach((week, index) => {
      const cell = document.createElement("div");
      const status = weekStatus(clazz, week, index);
      cell.className = `week-cell ${status}`;
      cell.dataset.week = week;
      cell.innerHTML = `<b>${week}</b><span>${week >= 34 || week <= 5 ? "1. HJ" : "2. HJ"}</span>`;
      attachDropTarget(cell, week);
      header.append(cell);
    });
    timeline.append(header);

    if (!fields.length) {
      timeline.innerHTML += `<div class="empty-plan"><h3>Noch keine Lernfelder</h3><p>Legen Sie zuerst ein Lernfeld an, um Planungsbausteine einzuordnen.</p></div>`;
      return;
    }

    fields.forEach((field, fieldIndex) => {
      const row = document.createElement("div");
      row.className = "subject-row";
      const subjectModules = clazz.modules.filter(module => module.fieldId === field.id);
      const planned = subjectModules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
      const percent = field.targetHours ? clamp(Math.round(planned / field.targetHours * 100), 0, 100) : 0;
      const label = document.createElement("div");
      label.className = "subject-label";
      label.style.setProperty("--subject-color", FIELD_COLORS[fieldIndex % FIELD_COLORS.length]);
      label.innerHTML = `<strong>${escapeHtml(field.code)} · ${escapeHtml(field.name)}</strong><span>${escapeHtml(field.area || "Lernfeld")} · ${planned} / ${field.targetHours} Std.</span><div class="subject-progress"><i style="width:${percent}%"></i></div>`;
      row.append(label);

      WEEK_SEQUENCE.forEach((week, index) => {
        const gridCell = document.createElement("div");
        gridCell.className = `grid-cell ${weekStatus(clazz, week, index)}`;
        gridCell.dataset.week = week;
        gridCell.title = `KW ${week}: Doppelklick zum Anlegen`;
        attachDropTarget(gridCell, week);
        gridCell.addEventListener("dblclick", () => openModuleDrawer(null, field.id, week));
        row.append(gridCell);
      });

      subjectModules.forEach(module => {
        const start = weekIndex(module.startWeek);
        if (start < 0) return;
        const card = document.createElement("article");
        card.className = "module-card";
        card.dataset.color = module.color || "blue";
        card.dataset.moduleId = module.id;
        card.draggable = true;
        card.style.gridColumn = `${start + 2} / span ${clamp(Number(module.duration) || 1, 1, WEEK_SEQUENCE.length - start)}`;
        card.style.gridRow = "1";
        card.innerHTML = `<strong>${escapeHtml(module.title)}</strong><span>${escapeHtml(module.content || "Noch keine Inhalte")}</span><small>${module.hours} Std. · ${module.duration} Wo.</small>`;
        card.addEventListener("click", event => {
          event.stopPropagation();
          openModuleDrawer(module.id);
        });
        card.addEventListener("dragstart", event => {
          event.dataTransfer.setData("text/plain", module.id);
          event.dataTransfer.effectAllowed = "move";
        });
        row.append(card);
      });

      timeline.append(row);
    });
  }

  function attachDropTarget(element, week) {
    element.addEventListener("dragover", event => {
      event.preventDefault();
      element.classList.add("drop-target");
    });
    element.addEventListener("dragleave", () => element.classList.remove("drop-target"));
    element.addEventListener("drop", event => {
      event.preventDefault();
      element.classList.remove("drop-target");
      const moduleId = event.dataTransfer.getData("text/plain");
      const clazz = activeClass();
      const module = clazz.modules.find(item => item.id === moduleId);
      if (!module || module.startWeek === week) return;
      commit(() => { module.startWeek = Number(week); }, `Baustein nach KW ${week} verschoben`);
    });
  }

  function renderFields() {
    const clazz = activeClass();
    const grid = $("#fieldGrid");
    const fields = classFields(clazz);
    grid.innerHTML = "";
    fields.forEach((field, index) => {
      const modules = clazz?.modules.filter(module => module.fieldId === field.id) || [];
      const planned = modules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
      const percent = field.targetHours ? clamp(Math.round(planned / field.targetHours * 100), 0, 100) : 0;
      const card = document.createElement("article");
      card.className = "field-card";
      card.style.setProperty("--field-color", FIELD_COLORS[index % FIELD_COLORS.length]);
      card.innerHTML = `
        <div class="field-card-header"><div><h3>${escapeHtml(field.code)} · ${escapeHtml(field.area || "Lernfeld")}</h3><p>${escapeHtml(field.name)}</p></div><span class="field-hours">${field.targetHours} Std.<small>${field.practicalHours ? `fpL ${field.practicalHours} Std.` : ""}</small></span></div>
        <div class="field-metric"><span>${modules.length} Bausteine</span><strong>${planned} Std. geplant</strong></div>
        <div class="progress"><i style="width:${percent}%"></i></div>`;
      grid.append(card);
    });
    if (!fields.length) grid.innerHTML = `<div class="empty-plan"><h3>Noch keine Lernfelder</h3><p>Fügen Sie das erste Lernfeld oder Fach hinzu.</p></div>`;
  }

  function renderOverview() {
    const grid = $("#overviewGrid");
    const modules = state.classes.flatMap(clazz => clazz.modules);
    const hours = modules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
    const dayClasses = state.classes.filter(clazz => clazz.type === "day").length;
    grid.innerHTML = `
      <article class="overview-card"><p>Klassen</p><div class="metric"><strong>${state.classes.length}</strong><span>insgesamt</span></div><p>${dayClasses} Tagesklassen · ${state.classes.length - dayClasses} Blockklassen</p></article>
      <article class="overview-card"><p>Planungsbausteine</p><div class="metric"><strong>${modules.length}</strong><span>Bausteine</span></div><p>über alle Klassen</p></article>
      <article class="overview-card"><p>Geplanter Umfang</p><div class="metric"><strong>${hours}</strong><span>Stunden</span></div><p>im Schuljahr ${escapeHtml(state.schoolYear)}</p></article>
      <table class="overview-table"><thead><tr><th>Klasse</th><th>Modell</th><th>Rhythmus</th><th>Bausteine</th><th>Stunden</th></tr></thead><tbody>${state.classes.map(clazz => `
        <tr><td><strong>${escapeHtml(clazz.name)}</strong></td><td>${clazz.type === "block" ? "Blockklasse" : "Tagesklasse"}</td><td>${escapeHtml(scheduleText(clazz))}</td><td>${clazz.modules.length}</td><td>${clazz.modules.reduce((sum, module) => sum + Number(module.hours || 0), 0)}</td></tr>`).join("")}</tbody></table>
      <div class="source-note"><strong>Lehrplanbezug:</strong> Bayerische Lehrplanrichtlinie für Industriemechaniker/-innen: Jahrgangsstufen 10 und 11 mit jeweils 336 Stunden sowie die gemeinsam ausgewiesenen Jahrgangsstufen 12/13 mit 392 Stunden. Die Ferienwochen entsprechen dem bayerischen Schuljahr 2026/27; Teilwochen werden im Raster als ganze Kalenderwoche markiert. Der 14-tägige Dienstag ist als A-Woche in geraden Kalenderwochen hinterlegt. <a href="https://www.isb.bayern.de/fileadmin/user_upload/Berufliche_Schulen/Berufsschule/Lehrplan/bs_lpr_industriemechaniker.pdf" target="_blank" rel="noreferrer">Lehrplan beim ISB</a></div>`;
  }

  function openModuleDrawer(moduleId = null, presetFieldId = null, presetWeek = null) {
    const clazz = activeClass();
    const fields = classFields(clazz);
    const module = moduleId ? clazz.modules.find(item => item.id === moduleId) : null;
    $("#drawerTitle").textContent = module ? "Baustein bearbeiten" : "Baustein anlegen";
    $("#moduleId").value = module?.id || "";
    $("#moduleTitle").value = module?.title || "";
    $("#moduleField").innerHTML = fields.map(field => `<option value="${field.id}">${escapeHtml(field.code)} · ${escapeHtml(field.name)}</option>`).join("");
    $("#moduleField").value = module?.fieldId || presetFieldId || fields[0]?.id || "";
    $("#moduleColor").value = module?.color || "blue";
    $("#moduleStart").innerHTML = WEEK_SEQUENCE.map(week => `<option value="${week}">KW ${week}</option>`).join("");
    $("#moduleStart").value = module?.startWeek || presetWeek || WEEK_SEQUENCE[0];
    $("#moduleDuration").value = module?.duration || 3;
    $("#moduleHours").value = module?.hours || 12;
    $("#moduleGoals").value = module?.goals || "";
    $("#moduleContent").value = module?.content || "";
    $("#moduleAssessment").value = module?.assessment || "";
    $("#deleteModuleBtn").hidden = !module;
    $("#drawerBackdrop").hidden = false;
    $("#detailDrawer").classList.add("open");
    $("#detailDrawer").setAttribute("aria-hidden", "false");
    window.setTimeout(() => $("#moduleTitle").focus(), 120);
  }

  function closeDrawer() {
    $("#detailDrawer").classList.remove("open");
    $("#detailDrawer").setAttribute("aria-hidden", "true");
    window.setTimeout(() => { $("#drawerBackdrop").hidden = true; }, 200);
  }

  function renderDayPatterns(selected = []) {
    $("#dayPatterns").innerHTML = DAYS.map(([key, name]) => {
      const current = selected.find(item => item.day === key);
      return `<label class="day-pattern"><input type="checkbox" value="${key}" ${current ? "checked" : ""}><span>${name}</span><select aria-label="Turnus ${name}" ${current ? "" : "disabled"}><option value="1" ${current?.interval !== 2 ? "selected" : ""}>jede Woche</option><option value="2" ${current?.interval === 2 ? "selected" : ""}>nur A-Woche</option></select></label>`;
    }).join("");
    $$(".day-pattern input").forEach(input => input.addEventListener("change", () => {
      $("select", input.closest(".day-pattern")).disabled = !input.checked;
    }));
  }

  function openClassDialog(clazz = null) {
    $("#classDialogTitle").textContent = clazz ? "Klassenrhythmus bearbeiten" : "Klasse anlegen";
    $("#classId").value = clazz?.id || "";
    $("#className").value = clazz?.name || "";
    const type = clazz?.type || "day";
    $$("input[name='classType']").forEach(input => { input.checked = input.value === type; });
    renderDayPatterns(clazz?.days || [{ day: "mo", interval: 1 }]);
    $("#blockRanges").value = clazz?.blockRanges || "";
    $("#deleteClassBtn").hidden = !clazz || state.classes.length <= 1;
    toggleClassTypeSettings();
    $("#classDialog").showModal();
    window.setTimeout(() => $("#className").focus(), 50);
  }

  function toggleClassTypeSettings() {
    const type = $("input[name='classType']:checked").value;
    $("#daySettings").hidden = type !== "day";
    $("#blockSettings").hidden = type !== "block";
  }

  function openExceptionDialog() {
    const exceptions = new Set(activeClass().exceptions || []);
    $("#exceptionWeeks").innerHTML = WEEK_SEQUENCE.map(week => `<label><input type="checkbox" value="${week}" ${exceptions.has(week) ? "checked" : ""}><span>KW ${week}</span></label>`).join("");
    $("#exceptionDialog").showModal();
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }

  async function registerWebMCPTools() {
    if (!document.modelContext?.registerTool) return;
    const result = text => ({ content: [{ type: "text", text }] });
    try {
      await document.modelContext.registerTool({
        name: "get_planning_summary",
        description: "Gibt den aktuellen Stand der didaktischen Jahresplanung mit Klassen, Modellen, Bausteinen und Stunden zurück.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          return result(JSON.stringify({
            schoolYear: state.schoolYear,
            classes: state.classes.map(clazz => ({
              id: clazz.id,
              name: clazz.name,
              type: clazz.type === "block" ? "Blockklasse" : "Tagesklasse",
              schedule: scheduleText(clazz),
              modules: clazz.modules.length,
              plannedHours: clazz.modules.reduce((sum, module) => sum + Number(module.hours || 0), 0)
            }))
          }));
        }
      });
      await document.modelContext.registerTool({
        name: "select_class",
        description: "Wählt eine Klasse in der Jahresplanung aus. Die Klassen-ID kann über get_planning_summary ermittelt werden.",
        inputSchema: {
          type: "object",
          properties: { classId: { type: "string", description: "ID der auszuwählenden Klasse" } },
          required: ["classId"]
        },
        execute({ classId }) {
          const clazz = state.classes.find(item => item.id === classId);
          if (!clazz) return result(`Klasse mit ID ${classId} wurde nicht gefunden.`);
          state.selectedClassId = classId;
          saveState();
          render();
          return result(`${clazz.name} ist jetzt ausgewählt.`);
        }
      });
      await document.modelContext.registerTool({
        name: "add_planning_module",
        description: "Fügt der ausgewählten Klasse einen Planungsbaustein hinzu.",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string", description: "Titel des Bausteins" },
            fieldId: { type: "string", description: "ID des Lernfelds" },
            startWeek: { type: "integer", description: "Kalenderwoche des Beginns" },
            duration: { type: "integer", minimum: 1, maximum: 18 },
            hours: { type: "integer", minimum: 1, maximum: 200 }
          },
          required: ["title", "fieldId", "startWeek", "duration", "hours"]
        },
        execute({ title, fieldId, startWeek, duration, hours }) {
          if (!classFields(activeClass()).some(field => field.id === fieldId)) return result(`Lernfeld mit ID ${fieldId} gehört nicht zur ausgewählten Klasse.`);
          if (weekIndex(startWeek) < 0) return result(`KW ${startWeek} liegt nicht im dargestellten Schuljahr.`);
          commit(() => activeClass().modules.push({
            id: id("module"), title, fieldId, startWeek: Number(startWeek),
            duration: clamp(Number(duration), 1, 18), hours: clamp(Number(hours), 1, 200),
            color: "blue", goals: "", content: "", assessment: ""
          }), "Baustein angelegt");
          return result(`${title} wurde in ${activeClass().name} ab KW ${startWeek} angelegt.`);
        }
      });
    } catch (error) {
      console.info("WebMCP-Werkzeuge konnten nicht registriert werden.", error);
    }
  }

  $("#schoolYear").addEventListener("change", event => commit(() => { state.schoolYear = event.target.value; }, "Schuljahr geändert"));
  $("#undoBtn").addEventListener("click", () => restore(undoStack, redoStack));
  $("#redoBtn").addEventListener("click", () => restore(redoStack, undoStack));
  $("#printBtn").addEventListener("click", () => window.print());
  $("#addClassBtn").addEventListener("click", () => openClassDialog());
  $("#editClassBtn").addEventListener("click", () => openClassDialog(activeClass()));
  $("#addModuleBtn").addEventListener("click", () => openModuleDrawer());
  $("#addFieldBtn").addEventListener("click", () => $("#fieldDialog").showModal());
  $("#manageExceptionsBtn").addEventListener("click", openExceptionDialog);
  $("#closeDrawerBtn").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $$("input[name='classType']").forEach(input => input.addEventListener("change", toggleClassTypeSettings));
  $$('[data-close-dialog]').forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeDialog).close()));

  $("#moduleForm").addEventListener("submit", event => {
    event.preventDefault();
    const clazz = activeClass();
    const moduleId = $("#moduleId").value;
    const data = {
      title: $("#moduleTitle").value.trim(),
      fieldId: $("#moduleField").value,
      color: $("#moduleColor").value,
      startWeek: Number($("#moduleStart").value),
      duration: Number($("#moduleDuration").value),
      hours: Number($("#moduleHours").value),
      goals: $("#moduleGoals").value.trim(),
      content: $("#moduleContent").value.trim(),
      assessment: $("#moduleAssessment").value.trim()
    };
    commit(() => {
      const module = clazz.modules.find(item => item.id === moduleId);
      if (module) Object.assign(module, data);
      else clazz.modules.push({ id: id("module"), ...data });
    }, moduleId ? "Baustein aktualisiert" : "Baustein angelegt");
    closeDrawer();
  });

  $("#deleteModuleBtn").addEventListener("click", () => {
    const moduleId = $("#moduleId").value;
    if (!moduleId || !window.confirm("Diesen Planungsbaustein löschen?")) return;
    commit(() => { activeClass().modules = activeClass().modules.filter(item => item.id !== moduleId); }, "Baustein gelöscht");
    closeDrawer();
  });

  $("#classForm").addEventListener("submit", event => {
    event.preventDefault();
    const classId = $("#classId").value;
    const type = $("input[name='classType']:checked").value;
    const days = $$(".day-pattern").filter(row => $("input", row).checked).map(row => ({
      day: $("input", row).value,
      interval: Number($("select", row).value)
    }));
    if (type === "day" && !days.length) {
      showToast("Bitte mindestens einen Schultag auswählen");
      return;
    }
    if (type === "block" && !parseBlockRanges($("#blockRanges").value).size) {
      showToast("Bitte gültige Blockwochen eintragen");
      return;
    }
    const data = {
      name: $("#className").value.trim(),
      type,
      days,
      blockRanges: $("#blockRanges").value.trim()
    };
    commit(() => {
      const clazz = state.classes.find(item => item.id === classId);
      if (clazz) Object.assign(clazz, data);
      else {
        const newClass = { id: id("class"), color: CLASS_COLORS[state.classes.length % CLASS_COLORS.length], exceptions: [], fieldIds: state.fields.map(field => field.id), modules: [], ...data };
        state.classes.push(newClass);
        state.selectedClassId = newClass.id;
      }
    }, classId ? "Klassenrhythmus aktualisiert" : "Klasse angelegt");
    $("#classDialog").close();
  });

  $("#deleteClassBtn").addEventListener("click", () => {
    const classId = $("#classId").value;
    const clazz = state.classes.find(item => item.id === classId);
    if (!clazz || state.classes.length <= 1 || !window.confirm(`${clazz.name} einschließlich aller Bausteine löschen?`)) return;
    commit(() => {
      state.classes = state.classes.filter(item => item.id !== classId);
      state.selectedClassId = state.classes[0].id;
    }, "Klasse gelöscht");
    $("#classDialog").close();
  });

  $("#fieldForm").addEventListener("submit", event => {
    event.preventDefault();
    commit(() => {
      const fieldId = id("field");
      state.fields.push({
      id: fieldId,
      code: $("#fieldCode").value.trim(),
      name: $("#fieldName").value.trim(),
      targetHours: Number($("#fieldHours").value)
      });
      const clazz = activeClass();
      if (Array.isArray(clazz.fieldIds)) clazz.fieldIds.push(fieldId);
    }, "Lernfeld hinzugefügt");
    event.target.reset();
    $("#fieldHours").value = 80;
    $("#fieldDialog").close();
  });

  $("#exceptionForm").addEventListener("submit", event => {
    event.preventDefault();
    const selected = $$("#exceptionWeeks input:checked").map(input => Number(input.value));
    commit(() => { activeClass().exceptions = selected; }, "Ausnahmen aktualisiert");
    $("#exceptionDialog").close();
  });
  $("#clearExceptionsBtn").addEventListener("click", () => $$("#exceptionWeeks input").forEach(input => { input.checked = false; }));

  $$(".tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".tab").forEach(item => item.classList.toggle("active", item === tab));
    $$('[data-view-panel]').forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === tab.dataset.view));
  }));

  $("#zoomInBtn").addEventListener("click", () => {
    zoom = clamp(zoom + 10, 54, 104);
    document.documentElement.style.setProperty("--week-width", `${zoom}px`);
  });
  $("#zoomOutBtn").addEventListener("click", () => {
    zoom = clamp(zoom - 10, 54, 104);
    document.documentElement.style.setProperty("--week-width", `${zoom}px`);
  });

  $("#exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jahresplanung-${state.schoolYear.replace("/", "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Planung exportiert");
  });
  $("#importBtn").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!Array.isArray(imported.classes) || !Array.isArray(imported.fields)) throw new Error("Ungültiges Format");
      commit(() => { state = imported; }, "Planung importiert");
    } catch (error) {
      showToast("Datei konnte nicht importiert werden");
    }
    event.target.value = "";
  });

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !event.shiftKey) {
      event.preventDefault();
      restore(undoStack, redoStack);
    }
    if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))) {
      event.preventDefault();
      restore(redoStack, undoStack);
    }
    if (event.key === "Escape" && $("#detailDrawer").classList.contains("open")) closeDrawer();
  });

  render();
  registerWebMCPTools();
})();
