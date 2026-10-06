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
  const STATE_VERSION = 4;
  const LEGACY_EXCEPTION_WEEKS = new Set([34, 35, 36, 37, 45, 52, 53, 1, 6, 12, 13, 20, 21, 31]);
  const DEFAULT_SUBJECT_COLORS = {
    "Fertigungstechnik": "#2f6ea5",
    "Bauelemente": "#32805f",
    "Instandhaltung": "#b34f49",
    "Automatisierungstechnik": "#7560a9",
    "Politik und Gesellschaft": "#b47d19",
    "Deutsch": "#247d82"
  };
  const BAVARIA_CALENDARS = {
    "2026/27": {
      breaks: [
        { from: "2026-08-03", to: "2026-09-14", name: "Sommerferien" },
        { from: "2026-11-02", to: "2026-11-06", name: "Allerheiligenferien" },
        { from: "2026-12-24", to: "2027-01-08", name: "Weihnachtsferien" },
        { from: "2027-02-08", to: "2027-02-12", name: "Frühjahrsferien" },
        { from: "2027-03-22", to: "2027-04-02", name: "Osterferien" },
        { from: "2027-05-18", to: "2027-05-28", name: "Pfingstferien" },
        { from: "2027-08-02", to: "2027-09-13", name: "Sommerferien" }
      ],
      days: {
        "2026-10-03": "Tag der Deutschen Einheit",
        "2026-11-01": "Allerheiligen",
        "2026-11-18": "Buß- und Bettag",
        "2026-12-25": "1. Weihnachtstag",
        "2026-12-26": "2. Weihnachtstag",
        "2027-01-01": "Neujahr",
        "2027-01-06": "Heilige Drei Könige",
        "2027-04-02": "Karfreitag",
        "2027-04-05": "Ostermontag",
        "2027-05-01": "Tag der Arbeit",
        "2027-05-06": "Christi Himmelfahrt",
        "2027-05-17": "Pfingstmontag",
        "2027-06-03": "Fronleichnam"
      }
    },
    "2027/28": {
      breaks: [
        { from: "2027-08-02", to: "2027-09-13", name: "Sommerferien" },
        { from: "2027-11-02", to: "2027-11-05", name: "Allerheiligenferien" },
        { from: "2027-12-24", to: "2028-01-07", name: "Weihnachtsferien" },
        { from: "2028-02-28", to: "2028-03-03", name: "Frühjahrsferien" },
        { from: "2028-04-10", to: "2028-04-21", name: "Osterferien" },
        { from: "2028-06-06", to: "2028-06-16", name: "Pfingstferien" },
        { from: "2028-07-31", to: "2028-09-11", name: "Sommerferien" }
      ],
      days: {
        "2027-10-03": "Tag der Deutschen Einheit",
        "2027-11-01": "Allerheiligen",
        "2027-11-17": "Buß- und Bettag",
        "2027-12-25": "1. Weihnachtstag",
        "2027-12-26": "2. Weihnachtstag",
        "2028-01-01": "Neujahr",
        "2028-01-06": "Heilige Drei Könige",
        "2028-04-14": "Karfreitag",
        "2028-04-17": "Ostermontag",
        "2028-05-01": "Tag der Arbeit",
        "2028-05-25": "Christi Himmelfahrt",
        "2028-06-05": "Pfingstmontag",
        "2028-06-15": "Fronleichnam"
      }
    },
    "2028/29": {
      breaks: [
        { from: "2028-07-31", to: "2028-09-11", name: "Sommerferien" },
        { from: "2028-10-30", to: "2028-11-03", name: "Allerheiligenferien" },
        { from: "2028-12-23", to: "2029-01-05", name: "Weihnachtsferien" },
        { from: "2029-02-12", to: "2029-02-16", name: "Frühjahrsferien" },
        { from: "2029-03-26", to: "2029-04-06", name: "Osterferien" },
        { from: "2029-05-22", to: "2029-06-01", name: "Pfingstferien" },
        { from: "2029-07-30", to: "2029-09-10", name: "Sommerferien" }
      ],
      days: {
        "2028-10-03": "Tag der Deutschen Einheit",
        "2028-11-01": "Allerheiligen",
        "2028-11-22": "Buß- und Bettag",
        "2028-12-25": "1. Weihnachtstag",
        "2028-12-26": "2. Weihnachtstag",
        "2029-01-01": "Neujahr",
        "2029-01-06": "Heilige Drei Könige",
        "2029-03-30": "Karfreitag",
        "2029-04-02": "Ostermontag",
        "2029-05-01": "Tag der Arbeit",
        "2029-05-10": "Christi Himmelfahrt",
        "2029-05-21": "Pfingstmontag",
        "2029-05-31": "Fronleichnam"
      }
    }
  };

  const seed = {
    version: STATE_VERSION,
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
        exceptions: [],
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
        exceptions: [],
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
        exceptions: [],
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
  let editingTimetable = {};
  let editingBlockWeeks = new Set();
  let editingClassFieldIds = [];

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
      if (saved && Array.isArray(saved.classes) && Array.isArray(saved.fields)) return migrateState(saved);
    } catch (error) {
      console.warn("Gespeicherte Planung konnte nicht geladen werden.", error);
    }
    return migrateState(seed);
  }

  function migrateState(source) {
    const data = clone(source);
    const previousVersion = Number(data.version || 1);
    data.version = STATE_VERSION;
    data.ui = { calendarDensity: "compact", ...(data.ui || {}) };
    data.subjectColors = { ...DEFAULT_SUBJECT_COLORS, ...(data.subjectColors || {}) };
    data.fields.forEach((field, index) => {
      field.area = field.area || "Sonstiges";
      if (!data.subjectColors[field.area]) data.subjectColors[field.area] = FIELD_COLORS[index % FIELD_COLORS.length];
    });
    data.classes.forEach(clazz => {
      clazz.days = (clazz.days || []).map(pattern => ({
        day: pattern.day,
        interval: Number(pattern.interval || 1),
        cycle: Number(pattern.cycle || 0)
      }));
      clazz.cycleAnchorWeek = Number(clazz.cycleAnchorWeek || WEEK_SEQUENCE[0]);
      clazz.blockWeeks = Array.isArray(clazz.blockWeeks) ? clazz.blockWeeks.map(Number) : [...parseBlockRanges(clazz.blockRanges)];
      clazz.blockRanges = compactBlockWeeks(clazz.blockWeeks);
      clazz.timetable = clazz.timetable && typeof clazz.timetable === "object" ? Object.fromEntries(Object.entries(clazz.timetable).map(([day, entries]) => [day, (entries || []).map((entry, index) => ({ id: entry.id || `lesson-${clazz.id}-${day}-${index}`, from: Number(entry.from || 1), to: Number(entry.to || entry.from || 1), fieldId: entry.fieldId || "" }))])) : {};
      clazz.assessments = Array.isArray(clazz.assessments) ? clazz.assessments.map((assessment, index) => ({ id: assessment.id || `assessment-${clazz.id}-${index}`, type: "Schulaufgabe", notes: "", ...assessment })) : [];
      clazz.exceptions = (clazz.exceptions || []).map(Number);
      if (previousVersion < STATE_VERSION) clazz.exceptions = clazz.exceptions.filter(week => !LEGACY_EXCEPTION_WEEKS.has(week));
      clazz.modules = (clazz.modules || []).map(module => ({
        status: "not-started",
        actualHours: 0,
        ...module,
        actualHours: Number(module.actualHours || 0)
      }));
    });
    return data;
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

  function compactBlockWeeks(weeks = []) {
    const ordered = [...new Set(weeks.map(Number).filter(week => weekIndex(week) >= 0))].sort((a, b) => weekIndex(a) - weekIndex(b));
    const groups = [];
    ordered.forEach(week => {
      const previous = groups.at(-1);
      if (previous && weekIndex(week) === weekIndex(previous.at(-1)) + 1) previous.push(week);
      else groups.push([week]);
    });
    return groups.map(group => group.length === 1 ? `${group[0]}` : `${group[0]}-${group.at(-1)}`).join(", ");
  }

  function mixHex(base, target, amount) {
    const parse = value => value.replace("#", "").match(/.{2}/g).map(part => parseInt(part, 16));
    const [br, bg, bb] = parse(base);
    const [tr, tg, tb] = parse(target);
    return `#${[br, bg, bb].map((value, index) => Math.round(value + ([tr, tg, tb][index] - value) * amount).toString(16).padStart(2, "0")).join("")}`;
  }

  function fieldColor(field) {
    if (!field) return FIELD_COLORS[0];
    const base = state.subjectColors?.[field.area] || DEFAULT_SUBJECT_COLORS[field.area] || FIELD_COLORS[0];
    const siblings = state.fields.filter(item => item.area === field.area);
    const variant = Math.max(0, siblings.findIndex(item => item.id === field.id)) % 4;
    if (variant === 1) return mixHex(base, "#000000", .18);
    if (variant === 2) return mixHex(base, "#ffffff", .24);
    if (variant === 3) return mixHex(base, "#000000", .08);
    return base;
  }

  function isoWeekDate(year, week, weekday) {
    const januaryFourth = new Date(Date.UTC(year, 0, 4));
    const monday = new Date(januaryFourth);
    monday.setUTCDate(januaryFourth.getUTCDate() - ((januaryFourth.getUTCDay() + 6) % 7) + (week - 1) * 7);
    monday.setUTCDate(monday.getUTCDate() + weekday - 1);
    return monday;
  }

  function dateKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function calendarYearForWeek(week) {
    const startYear = Number(String(state.schoolYear).slice(0, 4)) || 2026;
    return Number(week) >= 34 ? startYear : startYear + 1;
  }

  function freeDayName(date) {
    const calendar = BAVARIA_CALENDARS[state.schoolYear];
    if (!calendar) return "";
    const key = dateKey(date);
    const schoolBreak = calendar.breaks.find(item => key >= item.from && key <= item.to);
    return schoolBreak?.name || calendar.days[key] || "";
  }

  function patternMatchesWeek(clazz, pattern, index) {
    if (Number(pattern.interval || 1) === 1) return true;
    const anchor = Math.max(0, weekIndex(clazz.cycleAnchorWeek || WEEK_SEQUENCE[0]));
    const cycleIndex = ((index - anchor) % 2 + 2) % 2;
    return cycleIndex === Number(pattern.cycle || 0);
  }

  function scheduledWeekdays(clazz, week, index) {
    if (clazz.type === "block") {
      const blockWeeks = new Set((clazz.blockWeeks?.length ? clazz.blockWeeks : [...parseBlockRanges(clazz.blockRanges)]).map(Number));
      return blockWeeks.has(Number(week)) ? [1, 2, 3, 4, 5] : [];
    }
    return [...new Set((clazz.days || []).filter(pattern => patternMatchesWeek(clazz, pattern, index)).map(pattern => DAYS.findIndex(([key]) => key === pattern.day) + 1).filter(Boolean))];
  }

  function weekCalendarInfo(clazz, week, index) {
    const weekdays = scheduledWeekdays(clazz, week, index);
    if (!weekdays.length) return { status: "absent", weekdays, availableWeekdays: [], freeLabels: [] };
    if ((clazz.exceptions || []).includes(Number(week))) {
      return { status: "holiday", weekdays, availableWeekdays: [], freeLabels: ["Schulinterne Ausnahme"] };
    }
    const year = calendarYearForWeek(week);
    const entries = weekdays.map(weekday => ({ weekday, name: freeDayName(isoWeekDate(year, Number(week), weekday)) }));
    const availableWeekdays = entries.filter(entry => !entry.name).map(entry => entry.weekday);
    const freeLabels = [...new Set(entries.map(entry => entry.name).filter(Boolean))];
    const status = availableWeekdays.length === 0 ? "holiday" : availableWeekdays.length < weekdays.length ? "partial" : "present";
    return { status, weekdays, availableWeekdays, freeLabels };
  }

  function weekStatus(clazz, week, index) {
    return weekCalendarInfo(clazz, week, index).status;
  }

  function attendanceDays(clazz) {
    return WEEK_SEQUENCE.reduce((sum, week, index) => sum + weekCalendarInfo(clazz, week, index).availableWeekdays.length, 0);
  }

  function timetableHours(clazz, fieldId = null) {
    return WEEK_SEQUENCE.reduce((total, week, index) => {
      const info = weekCalendarInfo(clazz, week, index);
      return total + info.availableWeekdays.reduce((dayTotal, weekday) => {
        const dayKey = DAYS[weekday - 1]?.[0];
        const entries = (clazz.timetable?.[dayKey] || []).filter(entry => !fieldId || entry.fieldId === fieldId);
        return dayTotal + entries.reduce((sum, entry) => sum + Math.max(0, Number(entry.to || 0) - Number(entry.from || 0) + 1), 0);
      }, 0);
    }, 0);
  }

  function scheduleText(clazz) {
    if (clazz.type === "block") {
      const ranges = compactBlockWeeks(clazz.blockWeeks || []);
      return ranges ? `Blockwochen: ${ranges}` : "Noch keine Blockwochen festgelegt";
    }
    if (!clazz.days?.length) return "Noch keine Schultage festgelegt";
    const description = clazz.days.map(pattern => {
      const dayName = DAYS.find(([key]) => key === pattern.day)?.[1] || pattern.day;
      const cycle = Number(pattern.interval || 1) === 1 ? "wöchentlich" : Number(pattern.cycle || 0) === 0 ? "A-Woche" : "B-Woche";
      return `${dayName} · ${cycle}`;
    }).join(" · ");
    return (clazz.days || []).some(pattern => Number(pattern.interval || 1) === 2) ? `${description} · A-Rhythmus ab KW ${clazz.cycleAnchorWeek || WEEK_SEQUENCE[0]}` : description;
  }

  function getIsoWeek(date) {
    const value = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    value.setUTCDate(value.getUTCDate() + 4 - (value.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(value.getUTCFullYear(), 0, 1));
    return { year: value.getUTCFullYear(), week: Math.ceil((((value - yearStart) / 86400000) + 1) / 7) };
  }

  function currentTimelineIndex() {
    const now = new Date();
    const current = getIsoWeek(now);
    const startYear = Number(String(state.schoolYear).slice(0, 4)) || 2026;
    if (current.year === startYear && current.week >= 34) return weekIndex(current.week);
    if (current.year === startYear + 1 && current.week <= 31) return weekIndex(current.week);
    return current.year < startYear || (current.year === startYear && current.week < 34) ? -1 : WEEK_SEQUENCE.length;
  }

  function moduleCalendarPlacement(clazz, module) {
    const start = weekIndex(module.startWeek);
    const instructionWeeks = Math.max(1, Number(module.duration || 1));
    if (start < 0) return { start, end: start, span: 1, skippedWeeks: 0 };

    let completedInstructionWeeks = 0;
    let end = start;
    for (let index = start; index < WEEK_SEQUENCE.length; index += 1) {
      end = index;
      const info = weekCalendarInfo(clazz, WEEK_SEQUENCE[index], index);
      if (info.status !== "holiday") completedInstructionWeeks += 1;
      if (completedInstructionWeeks >= instructionWeeks) break;
    }

    const span = Math.max(1, end - start + 1);
    return {
      start,
      end,
      span,
      skippedWeeks: Math.max(0, span - completedInstructionWeeks)
    };
  }

  function expectedModuleHours(module, clazz = activeClass()) {
    const nowIndex = currentTimelineIndex();
    const placement = moduleCalendarPlacement(clazz, module);
    const start = placement.start;
    const duration = Math.max(1, Number(module.duration || 1));
    if (start < 0 || nowIndex < start) return 0;
    if (nowIndex >= placement.end) return Number(module.hours || 0);
    let elapsedInstructionWeeks = 0;
    for (let index = start; index <= Math.min(nowIndex, placement.end); index += 1) {
      if (weekCalendarInfo(clazz, WEEK_SEQUENCE[index], index).status !== "holiday") elapsedInstructionWeeks += 1;
    }
    return Number(module.hours || 0) * (elapsedInstructionWeeks / duration);
  }

  function actualModuleHours(module) {
    return clamp(Number(module.actualHours || 0), 0, Number(module.hours || 0));
  }

  function progressForClass(clazz) {
    const planned = clazz.modules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
    const expected = clazz.modules.reduce((sum, module) => sum + expectedModuleHours(module, clazz), 0);
    const actual = clazz.modules.reduce((sum, module) => sum + actualModuleHours(module), 0);
    return { planned, expected: Math.round(expected), actual, variance: Math.round(actual - expected) };
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
    const progress = progressForClass(clazz);
    const target = classFields(clazz).reduce((sum, field) => sum + Number(field.targetHours || 0), 0);
    $("#activeClassName").textContent = clazz.name;
    $("#activeClassType").textContent = clazz.type === "block" ? "Blockklasse" : "Tagesklasse";
    $("#activeClassType").classList.toggle("block", clazz.type === "block");
    const scheduledHours = timetableHours(clazz);
    $("#activeClassSchedule").textContent = [clazz.profile, scheduleText(clazz), scheduledHours ? `${scheduledHours} Std. laut Stundenplan` : ""].filter(Boolean).join(" · ");
    $("#attendanceCount").textContent = attendanceDays(clazz);
    $("#plannedHours").textContent = progress.planned;
    $("#actualHours").textContent = progress.actual;
    $("#coverageValue").textContent = `${target ? Math.round(progress.planned / target * 100) : 0}%`;
  }

  function assignCalendarLanes(clazz, modules, assessments) {
    const items = [
      ...modules.map(module => {
        const placement = moduleCalendarPlacement(clazz, module);
        return { kind: "module", id: module.id, start: placement.start, end: placement.end };
      }),
      ...assessments.map(assessment => ({ kind: "assessment", id: assessment.id, start: weekIndex(assessment.week), end: weekIndex(assessment.week) }))
    ].filter(item => item.start >= 0).sort((a, b) => a.start - b.start || b.end - a.end);
    const laneEnds = [];
    const laneByItem = new Map();
    items.forEach(item => {
      let lane = laneEnds.findIndex(end => item.start > end);
      if (lane < 0) lane = laneEnds.length;
      laneEnds[lane] = item.end;
      laneByItem.set(`${item.kind}:${item.id}`, lane);
    });
    return { laneByItem, laneCount: Math.max(1, laneEnds.length) };
  }

  function moduleStatusLabel(status) {
    return status === "completed" ? "Abgeschlossen" : status === "in-progress" ? "In Arbeit" : "Nicht begonnen";
  }

  function renderTimeline() {
    const clazz = activeClass();
    const timeline = $("#timeline");
    timeline.innerHTML = "";
    if (!clazz) return;
    const fields = classFields(clazz);
    const detailMode = state.ui?.calendarDensity === "detail";
    timeline.classList.toggle("detail-mode", detailMode);
    $$("input[name='calendarDensity']").forEach(input => { input.checked = input.value === (detailMode ? "detail" : "compact"); });

    const header = document.createElement("div");
    header.className = "timeline-header";
    const corner = document.createElement("div");
    corner.className = "corner-cell";
    corner.innerHTML = `<strong>Kalenderwochen</strong><span>${escapeHtml(state.schoolYear)} · ${WEEK_SEQUENCE.length} Wochen</span>`;
    header.append(corner);

    WEEK_SEQUENCE.forEach((week, index) => {
      const cell = document.createElement("div");
      const info = weekCalendarInfo(clazz, week, index);
      const current = currentTimelineIndex() === index ? " current" : "";
      cell.className = `week-cell ${info.status}${current}`;
      cell.dataset.week = week;
      cell.title = info.freeLabels.join(", ") || `KW ${week}`;
      cell.innerHTML = `<b>${week}</b><span>${info.freeLabels.length ? escapeHtml(info.freeLabels.join(" · ")) : week >= 34 || week <= 5 ? "1. HJ" : "2. HJ"}</span>`;
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
      const subjectAssessments = (clazz.assessments || []).filter(assessment => assessment.fieldId === field.id);
      const lanes = assignCalendarLanes(clazz, subjectModules, subjectAssessments);
      row.style.setProperty("--row-lanes", lanes.laneCount);
      const planned = subjectModules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
      const actual = subjectModules.reduce((sum, module) => sum + actualModuleHours(module), 0);
      const available = timetableHours(clazz, field.id);
      const percent = field.targetHours ? clamp(Math.round(planned / field.targetHours * 100), 0, 100) : 0;
      const label = document.createElement("div");
      label.className = "subject-label";
      label.style.setProperty("--subject-color", fieldColor(field));
      label.style.gridRow = `1 / span ${lanes.laneCount}`;
      label.innerHTML = `<strong>${escapeHtml(field.code)} · ${escapeHtml(field.name)}</strong><span>${escapeHtml(field.area || "Lernfeld")} · ${actual} Ist / ${planned} geplant / ${field.targetHours} Soll${available ? ` · ${available} im Stundenplan` : ""}</span><div class="subject-progress"><i style="width:${percent}%"></i></div>`;
      row.append(label);

      WEEK_SEQUENCE.forEach((week, index) => {
        const gridCell = document.createElement("div");
        const info = weekCalendarInfo(clazz, week, index);
        gridCell.className = `grid-cell ${info.status}`;
        gridCell.dataset.week = week;
        gridCell.style.gridColumn = `${index + 2}`;
        gridCell.style.gridRow = `1 / span ${lanes.laneCount}`;
        gridCell.title = `${info.freeLabels.length ? info.freeLabels.join(", ") + " · " : ""}KW ${week}: Doppelklick zum Anlegen`;
        attachDropTarget(gridCell, week, field.id);
        gridCell.addEventListener("dblclick", () => openModuleDrawer(null, field.id, week));
        row.append(gridCell);
      });

      subjectModules.forEach(module => {
        const placement = moduleCalendarPlacement(clazz, module);
        const start = placement.start;
        if (start < 0) return;
        const card = document.createElement("article");
        card.className = `module-card status-${module.status || "not-started"}`;
        card.dataset.moduleId = module.id;
        card.draggable = true;
        card.style.setProperty("--module-color", fieldColor(field));
        card.style.gridColumn = `${start + 2} / span ${clamp(placement.span, 1, WEEK_SEQUENCE.length - start)}`;
        card.style.gridRow = `${lanes.laneByItem.get(`module:${module.id}`) + 1}`;
        const extensionLabel = placement.skippedWeeks ? ` · +${placement.skippedWeeks} freie Wo.` : "";
        card.title = placement.skippedWeeks
          ? `${module.duration} Unterrichtswochen, automatisch um ${placement.skippedWeeks} freie ${placement.skippedWeeks === 1 ? "Woche" : "Wochen"} verlängert`
          : `${module.duration} Unterrichtswochen`;
        card.innerHTML = detailMode
          ? `<strong>${escapeHtml(module.title)}</strong><span class="module-goals"><b>Lernziele:</b> ${escapeHtml(module.goals || "Noch nicht eingetragen")}</span><span><b>Inhalte:</b> ${escapeHtml(module.content || "Noch nicht eingetragen")}</span><small><i class="status-dot"></i>${moduleStatusLabel(module.status)} · ${actualModuleHours(module)} / ${module.hours} Ist-Std. · ${module.duration} U.-Wo.${extensionLabel}</small>`
          : `<strong>${escapeHtml(module.title)}</strong><small><i class="status-dot"></i>${actualModuleHours(module)} / ${module.hours} Std. · ${moduleStatusLabel(module.status)}</small>`;
        card.addEventListener("click", event => {
          event.stopPropagation();
          openModuleDrawer(module.id);
        });
        card.addEventListener("dragstart", event => {
          event.dataTransfer.setData("text/plain", `module:${module.id}`);
          event.dataTransfer.effectAllowed = "move";
        });
        row.append(card);
      });

      subjectAssessments.forEach(assessment => {
        const start = weekIndex(assessment.week);
        if (start < 0) return;
        const card = document.createElement("button");
        card.type = "button";
        card.className = "assessment-card";
        card.draggable = true;
        card.style.setProperty("--module-color", fieldColor(field));
        card.style.gridColumn = `${start + 2}`;
        card.style.gridRow = `${lanes.laneByItem.get(`assessment:${assessment.id}`) + 1}`;
        card.title = [assessment.type, assessment.notes].filter(Boolean).join(" · ");
        card.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><span>${escapeHtml(assessment.title)}</span>`;
        card.addEventListener("click", event => { event.stopPropagation(); openAssessmentDialog(assessment.id); });
        card.addEventListener("dragstart", event => {
          event.dataTransfer.setData("text/plain", `assessment:${assessment.id}`);
          event.dataTransfer.effectAllowed = "move";
        });
        row.append(card);
      });

      timeline.append(row);
    });
  }

  function attachDropTarget(element, week, fieldId = null) {
    element.addEventListener("dragover", event => {
      event.preventDefault();
      element.classList.add("drop-target");
    });
    element.addEventListener("dragleave", () => element.classList.remove("drop-target"));
    element.addEventListener("drop", event => {
      event.preventDefault();
      element.classList.remove("drop-target");
      const [kind, itemId] = event.dataTransfer.getData("text/plain").split(":");
      const clazz = activeClass();
      if (kind === "assessment") {
        const assessment = (clazz.assessments || []).find(item => item.id === itemId);
        if (!assessment) return;
        commit(() => {
          assessment.week = Number(week);
          if (fieldId) assessment.fieldId = fieldId;
        }, `Leistungsnachweis nach KW ${week} verschoben`);
        return;
      }
      const module = clazz.modules.find(item => item.id === itemId);
      if (!module) return;
      commit(() => {
        module.startWeek = Number(week);
        if (fieldId) module.fieldId = fieldId;
      }, `Baustein nach KW ${week} verschoben`);
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
      const actual = modules.reduce((sum, module) => sum + actualModuleHours(module), 0);
      const percent = planned ? clamp(Math.round(actual / planned * 100), 0, 100) : 0;
      const card = document.createElement("article");
      card.className = "field-card";
      card.style.setProperty("--field-color", fieldColor(field));
      card.innerHTML = `
        <div class="field-card-header"><div><h3>${escapeHtml(field.code)} · ${escapeHtml(field.area || "Lernfeld")}</h3><p>${escapeHtml(field.name)}</p></div><span class="field-hours">${field.targetHours} Std.<small>${field.practicalHours ? `fpL ${field.practicalHours} Std.` : ""}</small></span></div>
        <div class="field-metric"><span>${modules.length} Bausteine</span><strong>${actual} Ist / ${planned} geplant</strong></div>
        <div class="progress"><i style="width:${percent}%"></i></div>`;
      grid.append(card);
    });
    if (!fields.length) grid.innerHTML = `<div class="empty-plan"><h3>Noch keine Lernfelder</h3><p>Fügen Sie das erste Lernfeld oder Fach hinzu.</p></div>`;
  }

  function renderOverview() {
    const grid = $("#overviewGrid");
    const modules = state.classes.flatMap(clazz => clazz.modules);
    const assessments = state.classes.flatMap(clazz => clazz.assessments || []);
    const hours = modules.reduce((sum, module) => sum + Number(module.hours || 0), 0);
    const actual = modules.reduce((sum, module) => sum + actualModuleHours(module), 0);
    const expected = Math.round(state.classes.reduce((classSum, clazz) => (
      classSum + clazz.modules.reduce((moduleSum, module) => moduleSum + expectedModuleHours(module, clazz), 0)
    ), 0));
    const variance = actual - expected;
    const dayClasses = state.classes.filter(clazz => clazz.type === "day").length;
    grid.innerHTML = `
      <article class="overview-card"><p>Klassen</p><div class="metric"><strong>${state.classes.length}</strong><span>insgesamt</span></div><p>${dayClasses} Tagesklassen · ${state.classes.length - dayClasses} Blockklassen</p></article>
      <article class="overview-card"><p>Planungsumfang</p><div class="metric"><strong>${hours}</strong><span>Stunden</span></div><p>${modules.length} Bausteine · ${assessments.length} Leistungsnachweise</p></article>
      <article class="overview-card"><p>Soll bis heute</p><div class="metric"><strong>${expected}</strong><span>Stunden</span></div><p>aus Startwoche und Dauer</p></article>
      <article class="overview-card ${variance < 0 ? "is-behind" : "is-on-track"}"><p>Ist-Stand</p><div class="metric"><strong>${actual}</strong><span>Stunden</span></div><p>${variance === 0 ? "genau im Plan" : variance > 0 ? `${variance} Std. vor dem Plan` : `${Math.abs(variance)} Std. hinter dem Plan`}</p></article>
      <table class="overview-table"><thead><tr><th>Klasse</th><th>Modell</th><th>Rhythmus</th><th>Stundenplan</th><th>Gesamt</th><th>Soll heute</th><th>Ist</th><th>Abweichung</th><th>Status</th></tr></thead><tbody>${state.classes.map(clazz => {
        const progress = progressForClass(clazz);
        const status = progress.variance < 0 ? "Rückstand" : progress.variance > 0 ? "Vorsprung" : "Im Plan";
        const scheduled = timetableHours(clazz);
        return `<tr><td><strong>${escapeHtml(clazz.name)}</strong></td><td>${clazz.type === "block" ? "Blockklasse" : "Tagesklasse"}</td><td>${escapeHtml(scheduleText(clazz))}</td><td>${scheduled || "–"}</td><td>${progress.planned}</td><td>${progress.expected}</td><td>${progress.actual}</td><td class="variance ${progress.variance < 0 ? "negative" : "positive"}">${progress.variance > 0 ? "+" : ""}${progress.variance}</td><td><span class="plan-status ${progress.variance < 0 ? "behind" : "on-track"}">${status}</span></td></tr>`;
      }).join("")}</tbody></table>
      <div class="source-note"><strong>Datengrundlage:</strong> Die bayerischen Ferien ${escapeHtml(state.schoolYear)}, gesetzlichen Feiertage und der unterrichtsfreie Buß- und Bettag werden automatisch berücksichtigt. <a href="https://www.km.bayern.de/termine/ferien-und-feiertage" target="_blank" rel="noreferrer">Ferienkalender des Kultusministeriums</a> · <a href="https://www.isb.bayern.de/fileadmin/user_upload/Berufliche_Schulen/Berufsschule/Lehrplan/bs_lpr_industriemechaniker.pdf" target="_blank" rel="noreferrer">Lehrplan beim ISB</a></div>`;
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
    $("#moduleStart").innerHTML = WEEK_SEQUENCE.map(week => `<option value="${week}">KW ${week}</option>`).join("");
    $("#moduleStart").value = module?.startWeek || presetWeek || WEEK_SEQUENCE[0];
    $("#moduleDuration").value = module?.duration || 3;
    $("#moduleHours").value = module?.hours || 12;
    $("#moduleGoals").value = module?.goals || "";
    $("#moduleContent").value = module?.content || "";
    $("#moduleAssessment").value = module?.assessment || "";
    $("#moduleActualHours").value = module?.actualHours || 0;
    $("#moduleStatus").value = module?.status || "not-started";
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
      const value = Number(current?.interval || 1) === 1 ? "weekly" : Number(current?.cycle || 0) === 0 ? "a" : "b";
      return `<label class="day-pattern"><input type="checkbox" value="${key}" ${current ? "checked" : ""}><span>${name}</span><select aria-label="Turnus ${name}" ${current ? "" : "disabled"}><option value="weekly" ${value === "weekly" ? "selected" : ""}>jede Woche</option><option value="a" ${value === "a" ? "selected" : ""}>nur A-Woche</option><option value="b" ${value === "b" ? "selected" : ""}>nur B-Woche</option></select></label>`;
    }).join("");
    $$(".day-pattern input").forEach(input => input.addEventListener("change", () => {
      $("select", input.closest(".day-pattern")).disabled = !input.checked;
      renderTimetableEditor();
    }));
  }

  function selectedDialogDays() {
    if ($("input[name='classType']:checked").value === "block") return DAYS.map(([key]) => key);
    return $$(".day-pattern").filter(row => $("input", row).checked).map(row => $("input", row).value);
  }

  function renderBlockWeekPicker() {
    $("#blockWeekPicker").innerHTML = WEEK_SEQUENCE.map(week => `<label><input type="checkbox" value="${week}" ${editingBlockWeeks.has(week) ? "checked" : ""}><span>KW ${week}<small>${week >= 34 ? String(state.schoolYear).slice(0, 4) : String(Number(String(state.schoolYear).slice(0, 4)) + 1)}</small></span></label>`).join("");
    $$("#blockWeekPicker input").forEach(input => input.addEventListener("change", () => {
      if (input.checked) editingBlockWeeks.add(Number(input.value));
      else editingBlockWeeks.delete(Number(input.value));
    }));
  }

  function availableDialogFields() {
    const fields = state.fields.filter(field => !editingClassFieldIds.length || editingClassFieldIds.includes(field.id));
    return fields.length ? fields : state.fields;
  }

  function timetableFieldOptions(selectedId) {
    return availableDialogFields().map(field => `<option value="${field.id}" ${field.id === selectedId ? "selected" : ""}>${escapeHtml(field.code)} · ${escapeHtml(field.area)} · ${escapeHtml(field.name)}</option>`).join("");
  }

  function renderTimetableEditor() {
    const editor = $("#timetableEditor");
    const days = selectedDialogDays();
    if (!days.length) {
      editor.innerHTML = `<p class="empty-inline">Wählen Sie zuerst mindestens einen Unterrichtstag.</p>`;
      return;
    }
    editor.innerHTML = days.map(day => {
      const dayName = DAYS.find(([key]) => key === day)?.[1] || day;
      const entries = editingTimetable[day] || [];
      return `<section class="timetable-day" data-day="${day}"><div class="timetable-day-heading"><strong>${dayName}</strong><button class="icon-button add-timetable-row" type="button" title="Unterricht hinzufügen" aria-label="Unterricht am ${dayName} hinzufügen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div><div class="timetable-rows">${entries.map(entry => `<div class="timetable-row" data-entry-id="${entry.id}"><label>von<input class="period-from" type="number" min="1" max="12" value="${entry.from}" aria-label="Erste Unterrichtsstunde"></label><label>bis<input class="period-to" type="number" min="1" max="12" value="${entry.to}" aria-label="Letzte Unterrichtsstunde"></label><label>Fach / Lernfeld<select class="period-field">${timetableFieldOptions(entry.fieldId)}</select></label><button class="icon-button remove-timetable-row" type="button" title="Eintrag entfernen" aria-label="Eintrag entfernen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></svg></button></div>`).join("") || `<p class="empty-inline">Noch kein Unterricht eingetragen.</p>`}</div></section>`;
    }).join("");
    $$(".add-timetable-row", editor).forEach(button => button.addEventListener("click", () => {
      const day = button.closest(".timetable-day").dataset.day;
      editingTimetable[day] ||= [];
      const last = editingTimetable[day].at(-1);
      const from = Math.min(12, Number(last?.to || 0) + 1 || 1);
      editingTimetable[day].push({ id: id("lesson"), from, to: from, fieldId: availableDialogFields()[0]?.id || "" });
      renderTimetableEditor();
    }));
    $$(".timetable-row", editor).forEach(row => {
      const day = row.closest(".timetable-day").dataset.day;
      const entry = editingTimetable[day].find(item => item.id === row.dataset.entryId);
      $(".period-from", row).addEventListener("change", event => { entry.from = clamp(Number(event.target.value), 1, 12); });
      $(".period-to", row).addEventListener("change", event => { entry.to = clamp(Number(event.target.value), entry.from, 12); });
      $(".period-field", row).addEventListener("change", event => { entry.fieldId = event.target.value; });
      $(".remove-timetable-row", row).addEventListener("click", () => {
        editingTimetable[day] = editingTimetable[day].filter(item => item.id !== entry.id);
        renderTimetableEditor();
      });
    });
  }

  function syncTimetableEditor() {
    $$(".timetable-row", $("#timetableEditor")).forEach(row => {
      const day = row.closest(".timetable-day").dataset.day;
      const entry = editingTimetable[day]?.find(item => item.id === row.dataset.entryId);
      if (!entry) return;
      entry.from = clamp(Number($(".period-from", row).value), 1, 12);
      entry.to = clamp(Number($(".period-to", row).value), entry.from, 12);
      entry.fieldId = $(".period-field", row).value;
    });
  }

  function openClassDialog(clazz = null) {
    $("#classDialogTitle").textContent = clazz ? "Klasse bearbeiten" : "Klasse anlegen";
    $("#classId").value = clazz?.id || "";
    $("#className").value = clazz?.name || "";
    $("#classProfile").value = clazz?.profile || "";
    const type = clazz?.type || "day";
    $$("input[name='classType']").forEach(input => { input.checked = input.value === type; });
    renderDayPatterns(clazz?.days || [{ day: "mo", interval: 1 }]);
    $("#cycleAnchorWeek").innerHTML = WEEK_SEQUENCE.map(week => `<option value="${week}">KW ${week}</option>`).join("");
    $("#cycleAnchorWeek").value = clazz?.cycleAnchorWeek || WEEK_SEQUENCE[0];
    editingTimetable = clone(clazz?.timetable || {});
    editingBlockWeeks = new Set((clazz?.blockWeeks?.length ? clazz.blockWeeks : [...parseBlockRanges(clazz?.blockRanges || "")]).map(Number));
    editingClassFieldIds = clone(clazz?.fieldIds || state.fields.map(field => field.id));
    renderBlockWeekPicker();
    $("#deleteClassBtn").hidden = !clazz || state.classes.length <= 1;
    toggleClassTypeSettings();
    $("#classDialog").showModal();
    window.setTimeout(() => $("#className").focus(), 50);
  }

  function toggleClassTypeSettings() {
    const type = $("input[name='classType']:checked").value;
    $("#daySettings").hidden = type !== "day";
    $("#blockSettings").hidden = type !== "block";
    renderTimetableEditor();
  }

  function openAssessmentDialog(assessmentId = null, presetFieldId = null, presetWeek = null) {
    const clazz = activeClass();
    const assessment = assessmentId ? (clazz.assessments || []).find(item => item.id === assessmentId) : null;
    const fields = classFields(clazz);
    $("#assessmentDialogTitle").textContent = assessment ? "Leistungsnachweis bearbeiten" : "Leistungsnachweis anlegen";
    $("#assessmentId").value = assessment?.id || "";
    $("#assessmentTitle").value = assessment?.title || "";
    $("#assessmentField").innerHTML = fields.map(field => `<option value="${field.id}">${escapeHtml(field.code)} · ${escapeHtml(field.area)} · ${escapeHtml(field.name)}</option>`).join("");
    $("#assessmentField").value = assessment?.fieldId || presetFieldId || fields[0]?.id || "";
    $("#assessmentWeek").innerHTML = WEEK_SEQUENCE.map(week => `<option value="${week}">KW ${week}</option>`).join("");
    $("#assessmentWeek").value = assessment?.week || presetWeek || WEEK_SEQUENCE[0];
    $("#assessmentType").value = assessment?.type || "Schulaufgabe";
    $("#assessmentNotes").value = assessment?.notes || "";
    $("#deleteAssessmentBtn").hidden = !assessment;
    $("#assessmentDialog").showModal();
    window.setTimeout(() => $("#assessmentTitle").focus(), 50);
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
              plannedHours: progressForClass(clazz).planned,
              expectedHoursToday: progressForClass(clazz).expected,
              actualHours: progressForClass(clazz).actual,
              varianceHours: progressForClass(clazz).variance,
              assessments: (clazz.assessments || []).length
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
            goals: "", content: "", assessment: "", actualHours: 0, status: "not-started"
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
  $("#addAssessmentBtn").addEventListener("click", () => openAssessmentDialog());
  $("#addFieldBtn").addEventListener("click", () => {
    $("#subjectAreas").innerHTML = Object.keys(state.subjectColors || {}).sort().map(area => `<option value="${escapeHtml(area)}"></option>`).join("");
    $("#fieldDialog").showModal();
  });
  $("#manageExceptionsBtn").addEventListener("click", openExceptionDialog);
  $("#closeDrawerBtn").addEventListener("click", closeDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $$("input[name='classType']").forEach(input => input.addEventListener("change", toggleClassTypeSettings));
  $$('[data-close-dialog]').forEach(button => button.addEventListener("click", () => $("#" + button.dataset.closeDialog).close()));
  $("#selectAllBlockWeeksBtn").addEventListener("click", () => {
    editingBlockWeeks = new Set(WEEK_SEQUENCE);
    renderBlockWeekPicker();
  });
  $("#clearBlockWeeksBtn").addEventListener("click", () => {
    editingBlockWeeks.clear();
    renderBlockWeekPicker();
  });

  $("#moduleForm").addEventListener("submit", event => {
    event.preventDefault();
    const clazz = activeClass();
    const moduleId = $("#moduleId").value;
    const data = {
      title: $("#moduleTitle").value.trim(),
      fieldId: $("#moduleField").value,
      startWeek: Number($("#moduleStart").value),
      duration: Number($("#moduleDuration").value),
      hours: Number($("#moduleHours").value),
      goals: $("#moduleGoals").value.trim(),
      content: $("#moduleContent").value.trim(),
      assessment: $("#moduleAssessment").value.trim(),
      actualHours: Number($("#moduleActualHours").value || 0),
      status: $("#moduleStatus").value
    };
    data.actualHours = clamp(data.actualHours, 0, data.hours);
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
  $("#moduleStatus").addEventListener("change", event => {
    if (event.target.value === "completed" && Number($("#moduleActualHours").value || 0) === 0) $("#moduleActualHours").value = $("#moduleHours").value;
  });

  $("#assessmentForm").addEventListener("submit", event => {
    event.preventDefault();
    const clazz = activeClass();
    const assessmentId = $("#assessmentId").value;
    const data = {
      title: $("#assessmentTitle").value.trim(),
      fieldId: $("#assessmentField").value,
      week: Number($("#assessmentWeek").value),
      type: $("#assessmentType").value,
      notes: $("#assessmentNotes").value.trim()
    };
    commit(() => {
      const assessment = (clazz.assessments || []).find(item => item.id === assessmentId);
      if (assessment) Object.assign(assessment, data);
      else {
        clazz.assessments ||= [];
        clazz.assessments.push({ id: id("assessment"), ...data });
      }
    }, assessmentId ? "Leistungsnachweis aktualisiert" : "Leistungsnachweis angelegt");
    $("#assessmentDialog").close();
  });

  $("#deleteAssessmentBtn").addEventListener("click", () => {
    const assessmentId = $("#assessmentId").value;
    if (!assessmentId || !window.confirm("Diesen Leistungsnachweis löschen?")) return;
    commit(() => { activeClass().assessments = (activeClass().assessments || []).filter(item => item.id !== assessmentId); }, "Leistungsnachweis gelöscht");
    $("#assessmentDialog").close();
  });

  $("#classForm").addEventListener("submit", event => {
    event.preventDefault();
    const classId = $("#classId").value;
    const type = $("input[name='classType']:checked").value;
    const days = $$(".day-pattern").filter(row => $("input", row).checked).map(row => ({
      day: $("input", row).value,
      interval: $("select", row).value === "weekly" ? 1 : 2,
      cycle: $("select", row).value === "b" ? 1 : 0
    }));
    if (type === "day" && !days.length) {
      showToast("Bitte mindestens einen Schultag auswählen");
      return;
    }
    if (type === "block" && !editingBlockWeeks.size) {
      showToast("Bitte mindestens eine Blockwoche auswählen");
      return;
    }
    syncTimetableEditor();
    const usedFieldIds = [...new Set(Object.values(editingTimetable).flat().map(entry => entry.fieldId).filter(Boolean))];
    const data = {
      name: $("#className").value.trim(),
      profile: $("#classProfile").value.trim(),
      type,
      days,
      cycleAnchorWeek: Number($("#cycleAnchorWeek").value),
      blockWeeks: [...editingBlockWeeks].sort((a, b) => weekIndex(a) - weekIndex(b)),
      blockRanges: compactBlockWeeks([...editingBlockWeeks]),
      timetable: clone(editingTimetable),
      fieldIds: [...new Set([...editingClassFieldIds, ...usedFieldIds])]
    };
    commit(() => {
      const clazz = state.classes.find(item => item.id === classId);
      if (clazz) Object.assign(clazz, data);
      else {
        const newClass = { id: id("class"), color: CLASS_COLORS[state.classes.length % CLASS_COLORS.length], exceptions: [], assessments: [], modules: [], ...data };
        state.classes.push(newClass);
        state.selectedClassId = newClass.id;
      }
    }, classId ? "Klasse aktualisiert" : "Klasse angelegt");
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
      const area = $("#fieldArea").value.trim();
      state.subjectColors ||= {};
      if (!state.subjectColors[area]) state.subjectColors[area] = $("#fieldColor").value;
      state.fields.push({
        id: fieldId,
        code: $("#fieldCode").value.trim(),
        area,
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
  $$("input[name='calendarDensity']").forEach(input => input.addEventListener("change", event => {
    commit(() => { state.ui.calendarDensity = event.target.value; }, event.target.value === "detail" ? "Ausführliche Ansicht" : "Kompakte Ansicht");
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
      commit(() => { state = migrateState(imported); }, "Planung importiert");
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
